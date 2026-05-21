package com.nexafort.cache;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

@Service
public class CacheEvictionService {
    @CacheEvict(value = {"projects", "project"}, allEntries = true)
    public void evictAllProjectCaches() {}
}
