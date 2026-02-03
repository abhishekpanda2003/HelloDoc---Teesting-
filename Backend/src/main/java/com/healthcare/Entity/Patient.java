package com.healthcare.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id", column = @Column(name="patient_id"))


public class Patient extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "patient")
    private List<MedicalReport> medicalReports;
}

