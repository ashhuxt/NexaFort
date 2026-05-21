package com.nexafort.repository;
import com.nexafort.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, String> {
    Page<Project> findByOwnerId(String ownerId, Pageable pageable);
    Page<Project> findByOwnerIdAndStatus(String ownerId, ProjectStatus status, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.owner.id = :ownerId " +
           "AND (:status IS NULL OR p.status = :status) " +
           "AND (:priority IS NULL OR p.priority = :priority)")
    Page<Project> findByOwnerWithFilters(
        @Param("ownerId") String ownerId,
        @Param("status") ProjectStatus status,
        @Param("priority") ProjectPriority priority,
        Pageable pageable);
}
