package com.healthcare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(
        name = "doctor_availability",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"doctor_id", "day_of_week", "start_time", "end_time"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAvailability extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DaysOfWeek dayOfWeek;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "is_virtual_allowed", nullable = false)
    private boolean virtualAllowed;
}

