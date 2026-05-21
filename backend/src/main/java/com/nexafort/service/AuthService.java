package com.nexafort.service;
import com.nexafort.audit.AuditService;
import com.nexafort.dto.request.*;
import com.nexafort.dto.response.*;
import com.nexafort.entity.*;
import com.nexafort.exception.ApiException;
import com.nexafort.mapper.UserMapper;
import com.nexafort.repository.UserRepository;
import com.nexafort.security.JwtService;
import com.nexafort.util.InputSanitizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final UserMapper userMapper;
    private final AuditService auditService;
    private final InputSanitizer inputSanitizer;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String sanitizedName = inputSanitizer.sanitizePlainText(request.getName());
        String normalizedEmail = inputSanitizer.normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ApiException("Email already registered", HttpStatus.CONFLICT);
        }
        User user = User.builder()
            .name(sanitizedName)
            .email(normalizedEmail)
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.ROLE_USER)
            .build();
        userRepository.save(user);
        log.info("New user registered: {}", user.getEmail());
        auditService.log("USER_REGISTERED", "User", user.getId(), user.getEmail(), null, null);

        String accessToken  = jwtService.generateAccessToken(user);
        RefreshToken refresh = refreshTokenService.createRefreshToken(user);
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refresh.getToken())
            .user(userMapper.toResponse(user))
            .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(inputSanitizer.normalizeEmail(request.getEmail()), request.getPassword())
        );
        User user = userRepository.findByEmail(inputSanitizer.normalizeEmail(request.getEmail()))
            .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
        log.info("User logged in: {}", user.getEmail());
        auditService.log("USER_LOGIN", "User", user.getId(), user.getEmail(), null, null);

        String accessToken  = jwtService.generateAccessToken(user);
        RefreshToken refresh = refreshTokenService.createRefreshToken(user);
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refresh.getToken())
            .user(userMapper.toResponse(user))
            .build();
    }

    public AuthResponse refreshToken(String token) {
        RefreshToken refreshToken = refreshTokenService.findByToken(token);
        refreshTokenService.verifyExpiration(refreshToken);
        User user = refreshToken.getUser();
        String accessToken = jwtService.generateAccessToken(user);
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(token)
            .user(userMapper.toResponse(user))
            .build();
    }
}
