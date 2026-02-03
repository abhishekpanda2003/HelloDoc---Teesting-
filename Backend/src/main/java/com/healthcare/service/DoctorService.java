package com.healthcare.service;

import com.healthcare.dto.DoctorDTO;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> getAllDoctors();
    DoctorDTO getDoctorById(Long id);
}
