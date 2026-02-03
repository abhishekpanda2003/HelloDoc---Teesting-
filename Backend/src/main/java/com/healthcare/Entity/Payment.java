package com.healthcare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(
        name = "payments",
        uniqueConstraints = @UniqueConstraint(columnNames = "transaction_id")
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String method;

    @Column(nullable = false)
    private String status;

    @Column(name = "transaction_id", nullable = false, unique = true)
    private String transactionId;

    @Lob
    @Column(name = "transaction_receipt")
    private byte[] transactionReceipt;
}
