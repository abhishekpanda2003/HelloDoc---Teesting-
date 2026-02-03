package com.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private Long id;
    private String name;
    private String location;
    private BigDecimal consultationFee;
    private float rating;
}
