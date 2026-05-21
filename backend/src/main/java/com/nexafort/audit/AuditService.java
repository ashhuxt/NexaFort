package com.nexafort.audit;
import com.nexafort.entity.AuditLog;
import com.nexafort.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    @Async
    public void log(String action, String entityType, String entityId, String performedBy, String ipAddress, String details) {
        try {
            AuditLog entry = AuditLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .performedBy(performedBy)
                .ipAddress(ipAddress)
                .details(details)
                .build();
            auditLogRepository.save(entry);
            log.info("AUDIT | action={} | entity={}/{} | by={}", action, entityType, entityId, performedBy);
        } catch (Exception e) {
            log.error("Failed to save audit log", e);
        }
    }
}
