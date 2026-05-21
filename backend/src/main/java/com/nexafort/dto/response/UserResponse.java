package com.nexafort.dto.response;
import com.nexafort.entity.Role;
import lombok.*;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
