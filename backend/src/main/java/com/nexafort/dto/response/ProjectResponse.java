package com.nexafort.dto.response;
import com.nexafort.entity.ProjectPriority;
import com.nexafort.entity.ProjectStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProjectResponse {
    private String id;
    private String title;
    private String description;
    private ProjectStatus status;
    private ProjectPriority priority;
    private String ownerName;
    private String ownerEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
