package com.nexafort.service;
import com.nexafort.audit.AuditService;
import com.nexafort.dto.request.UpdateUserRoleRequest;
import com.nexafort.dto.response.ApiResponse;
import com.nexafort.dto.response.UserResponse;
import com.nexafort.entity.User;
import com.nexafort.exception.ApiException;
import com.nexafort.exception.ResourceNotFoundException;
import com.nexafort.mapper.UserMapper;
import com.nexafort.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuditService auditService;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toResponse).toList();
    }

    @Transactional
    public UserResponse updateUserRole(String userId, UpdateUserRoleRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        user.setRole(request.getRole());
        User saved = userRepository.save(user);
        auditService.log("USER_ROLE_UPDATED", "User", userId, getCurrentActor(), null, "role=" + request.getRole());
        return userMapper.toResponse(saved);
    }

    @Transactional
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        String actor = getCurrentActor();
        if (user.getEmail().equalsIgnoreCase(actor)) {
            throw new ApiException("Admin cannot delete their own account", HttpStatus.BAD_REQUEST);
        }

        userRepository.delete(user);
        auditService.log("USER_DELETED", "User", userId, actor, null, "email=" + user.getEmail());
    }

    private String getCurrentActor() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
