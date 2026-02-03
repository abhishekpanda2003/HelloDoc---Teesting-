package com.healthcare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id", column = @Column(name="doctor_id"))

public class Doctor extends BaseEntity{

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User userDetails;

    @Column(nullable = false)
    private String location;

    @Column(name = "consultation_fee", nullable = false)
    private BigDecimal consultationFee;

    private float rating;

    @OneToMany(mappedBy = "doctor")
    private List<DoctorSpecialization> specializations;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorAvailability> availabilitySlots;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "doctor")
    private List<MedicalReport> medicalReports;
}
