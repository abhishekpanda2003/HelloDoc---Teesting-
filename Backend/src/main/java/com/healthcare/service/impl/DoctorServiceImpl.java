package com.healthcare.service.impl;

import com.healthcare.Entity.Doctor;
import com.healthcare.dto.DoctorDTO;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> docs = doctorRepository.findAll();
        return docs.stream().map(this::map).collect(Collectors.toList());
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor d = doctorRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Doctor not found"));
        return map(d);
    }

    private DoctorDTO map(Doctor d) {
        String name = "";
        if (d.getUserDetails() != null) {
            name = d.getUserDetails().getFirstName() + " " + d.getUserDetails().getLastName();
        }
        return new DoctorDTO(d.getId(), name, d.getLocation(), d.getConsultationFee(), d.getRating());
    }
}
