package com.nexafort.repository;
import com.nexafort.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
    List<AuditLog> findByPerformedByOrderByTimestampDesc(String email);
}
