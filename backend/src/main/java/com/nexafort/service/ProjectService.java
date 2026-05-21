package com.nexafort.service;
import com.nexafort.audit.AuditService;
import com.nexafort.cache.CacheEvictionService;
import com.nexafort.config.CacheConfig;
import com.nexafort.dto.request.ProjectRequest;
import com.nexafort.dto.response.*;
import com.nexafort.entity.*;
import com.nexafort.exception.*;
import com.nexafort.mapper.ProjectMapper;
import com.nexafort.repository.*;
import com.nexafort.util.InputSanitizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;
    private final AuditService auditService;
    private final InputSanitizer inputSanitizer;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }

    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {
        User user = getCurrentUser();
        Project project = projectMapper.toEntity(request);
        project.setTitle(inputSanitizer.sanitizePlainText(project.getTitle()));
        project.setDescription(inputSanitizer.sanitizePlainText(project.getDescription()));
        project.setOwner(user);
        Project saved = projectRepository.save(project);
        log.info("Project created by user {}: {}", user.getEmail(), saved.getId());
        auditService.log("PROJECT_CREATED", "Project", saved.getId(), user.getEmail(), null, "title=" + saved.getTitle());
        return projectMapper.toResponse(saved);
    }

    @Cacheable(value = CacheConfig.PROJECTS_CACHE, key = "#ownerId + '_' + #page + '_' + #size + '_' + #status")
    public PagedResponse<ProjectResponse> getProjectsByOwner(String ownerId, int page, int size,
                                                              String sortBy, String status, String priority) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        ProjectStatus st = status != null ? ProjectStatus.valueOf(status.toUpperCase()) : null;
        ProjectPriority pr = priority != null ? ProjectPriority.valueOf(priority.toUpperCase()) : null;
        Page<Project> projects = projectRepository.findByOwnerWithFilters(ownerId, st, pr, pageable);
        return buildPagedResponse(projects);
    }

    @Cacheable(value = CacheConfig.PROJECT_CACHE, key = "#id")
    public ProjectResponse getProjectById(String id) {
        User user = getCurrentUser();
        Project project = findAndAuthorize(id, user);
        return projectMapper.toResponse(project);
    }

    @Transactional
    @CacheEvict(value = {CacheConfig.PROJECTS_CACHE, CacheConfig.PROJECT_CACHE}, allEntries = true)
    public ProjectResponse updateProject(String id, ProjectRequest request) {
        User user = getCurrentUser();
        Project project = findAndAuthorize(id, user);
        projectMapper.updateEntity(project, request);
        project.setTitle(inputSanitizer.sanitizePlainText(project.getTitle()));
        project.setDescription(inputSanitizer.sanitizePlainText(project.getDescription()));
        Project saved = projectRepository.save(project);
        log.info("Project updated by user {}: {}", user.getEmail(), id);
        auditService.log("PROJECT_UPDATED", "Project", id, user.getEmail(), null, null);
        return projectMapper.toResponse(saved);
    }

    @Transactional
    @CacheEvict(value = {CacheConfig.PROJECTS_CACHE, CacheConfig.PROJECT_CACHE}, allEntries = true)
    public void deleteProject(String id) {
        User user = getCurrentUser();
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project", id));
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;
        if (!isAdmin && !project.getOwner().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to delete this project");
        }
        projectRepository.delete(project);
        log.info("Project deleted by {}: {}", user.getEmail(), id);
        auditService.log("PROJECT_DELETED", "Project", id, user.getEmail(), null, null);
    }

    // Admin: get all projects
    @Cacheable(value = CacheConfig.PROJECTS_CACHE, key = "'all_' + #page + '_' + #size")
    public PagedResponse<ProjectResponse> getAllProjects(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return buildPagedResponse(projectRepository.findAll(pageable));
    }

    private Project findAndAuthorize(String id, User user) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project", id));
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;
        if (!isAdmin && !project.getOwner().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to access this project");
        }
        return project;
    }

    private PagedResponse<ProjectResponse> buildPagedResponse(org.springframework.data.domain.Page<Project> page) {
        return PagedResponse.<ProjectResponse>builder()
            .content(page.getContent().stream().map(projectMapper::toResponse).toList())
            .page(page.getNumber())
            .size(page.getSize())
            .totalElements(page.getTotalElements())
            .totalPages(page.getTotalPages())
            .last(page.isLast())
            .build();
    }
}
