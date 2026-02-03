package com.healthcare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "doctor_specializations",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"doctor_id", "specialization_id"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class DoctorSpecialization extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "specialization_id", nullable = false)
    private Specialization specialization;

    @Column(name = "experience_years", nullable = false)
    private int experienceYears;
}

