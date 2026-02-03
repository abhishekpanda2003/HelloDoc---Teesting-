package com.healthcare.dto;

import lombok.Data;

@Data
public class AppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private String scheduledAt; // ISO-8601 LocalDateTime string, e.g. 2026-01-30T14:30
    private String type;
}
