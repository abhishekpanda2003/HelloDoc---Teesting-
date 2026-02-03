package com.healthcare.service.impl;

import com.healthcare.Entity.Appointment;
import com.healthcare.Entity.Doctor;
import com.healthcare.Entity.Patient;
import com.healthcare.dto.AppointmentRequest;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public void bookAppointment(AppointmentRequest req) {
        Patient p = patientRepository.findById(req.getPatientId()).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Patient not found"));
        Doctor d = doctorRepository.findById(req.getDoctorId()).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Doctor not found"));

        LocalDateTime at;
        try {
            at = LocalDateTime.parse(req.getScheduledAt());
        } catch (Exception e) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid datetime format");
        }

        Appointment a = new Appointment();
        a.setPatient(p);
        a.setDoctor(d);
        a.setScheduledAt(at);
        a.setType(req.getType());
        a.setStatus(com.healthcare.Entity.Status.BOOKED);

        appointmentRepository.save(a);
    }
}
