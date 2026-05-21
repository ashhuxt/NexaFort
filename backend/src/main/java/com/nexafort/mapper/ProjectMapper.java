package com.nexafort.mapper;
import com.nexafort.dto.request.ProjectRequest;
import com.nexafort.dto.response.ProjectResponse;
import com.nexafort.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public Project toEntity(ProjectRequest req) {
        return Project.builder()
            .title(req.getTitle())
            .description(req.getDescription())
            .status(req.getStatus())
            .priority(req.getPriority())
            .build();
    }

    public ProjectResponse toResponse(Project project) {
        return ProjectResponse.builder()
            .id(project.getId())
            .title(project.getTitle())
            .description(project.getDescription())
            .status(project.getStatus())
            .priority(project.getPriority())
            .ownerName(project.getOwner().getName())
            .ownerEmail(project.getOwner().getEmail())
            .createdAt(project.getCreatedAt())
            .updatedAt(project.getUpdatedAt())
            .build();
    }

    public void updateEntity(Project project, ProjectRequest req) {
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setStatus(req.getStatus());
        project.setPriority(req.getPriority());
    }
}
