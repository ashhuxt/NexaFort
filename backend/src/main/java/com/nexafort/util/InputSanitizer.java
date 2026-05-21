package com.nexafort.util;

import org.springframework.stereotype.Component;

@Component
public class InputSanitizer {

    public String sanitizePlainText(String value) {
        if (value == null) {
            return null;
        }

        return value
            .replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", "")
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#39;")
            .trim()
            .replaceAll("\\s{2,}", " ");
    }

    public String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }
}
