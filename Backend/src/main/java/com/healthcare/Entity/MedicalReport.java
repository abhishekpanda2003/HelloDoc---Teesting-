package com.healthcare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medical_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalReport extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(name = "report_type", nullable = false)
    private String reportType;

    @Lob
    @Column(name = "report_file", nullable = false)
    private byte[] reportFile;
}

