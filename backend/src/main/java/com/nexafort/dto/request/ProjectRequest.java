package com.nexafort.dto.request;
import com.nexafort.entity.ProjectPriority;
import com.nexafort.entity.ProjectStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProjectRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be 3-200 characters")
    private String title;

    @Size(max = 2000, message = "Description max 2000 characters")
    private String description;

    private ProjectStatus status = ProjectStatus.ACTIVE;
    private ProjectPriority priority = ProjectPriority.MEDIUM;
}
