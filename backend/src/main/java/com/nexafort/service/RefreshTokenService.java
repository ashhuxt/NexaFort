package com.nexafort.service;

import com.nexafort.entity.*;
import com.nexafort.exception.ApiException;
import com.nexafort.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Transactional
    public RefreshToken createRefreshToken(User user) {
        // 1. Explicitly remove existing tokens for this user
        refreshTokenRepository.deleteByUserId(user.getId());

        // 2. Force a database flush to ensure the DELETE happens BEFORE the INSERT
        refreshTokenRepository.flush();

        // 3. Create and save the new token
        RefreshToken token = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiresAt(LocalDateTime.now().plusSeconds(refreshTokenExpiration / 1000))
                .build();

        return refreshTokenRepository.save(token);
    }

    @Transactional(readOnly = true)
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            // Note: Deletion here would require a separate @Transactional method or an update to the entity state
            throw new ApiException("Refresh token has expired. Please login again.", HttpStatus.UNAUTHORIZED);
        }
        return token;
    }

    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new ApiException("Invalid refresh token", HttpStatus.UNAUTHORIZED));
    }
}