package com.healthcare.service.impl;

import com.healthcare.Entity.Doctor;
import com.healthcare.Entity.Patient;
import com.healthcare.Entity.User;
import com.healthcare.dto.LoginRequest;
import com.healthcare.dto.SignupRequest;
import com.healthcare.dto.UserResponse;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public UserResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(BAD_REQUEST, "Email already in use");
        }

        LocalDate dob;
        try {
            dob = LocalDate.parse(req.getDob());
        } catch (DateTimeParseException e) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid dob format, expected yyyy-MM-dd");
        }

        User u = new User();
        u.setFirstName(req.getFirstName());
        u.setLastName(req.getLastName());
        u.setEmail(req.getEmail());
        u.setPassword(req.getPassword()); // NOTE: plaintext for now per scope
        u.setPhone(req.getPhone());
        u.setGender(req.getGender());
        u.setDob(dob);
        u.setRole(req.getRole());

        User saved = userRepository.save(u);

        // create role-specific entity skeletons
        if (req.getRole() != null) {
            switch (req.getRole()) {
                case PATIENT:
                    Patient p = new Patient();
                    p.setUser(saved);
                    p.setAddress("");
                    patientRepository.save(p);
                    break;
                case DOCTOR:
                    Doctor d = new Doctor();
                    d.setUserDetails(saved);
                    d.setLocation("");
                    d.setConsultationFee(null);
                    doctorRepository.save(d);
                    break;
                default:
                    break;
            }
        }

        return mapToResponse(saved);
    }

    @Override
    public UserResponse login(LoginRequest req) {
        User u = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
        if (!u.getPassword().equals(req.getPassword())) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid credentials");
        }
        return mapToResponse(u);
    }

    @Override
    public UserResponse getById(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
        return mapToResponse(u);
    }

    private UserResponse mapToResponse(User u) {
        return new UserResponse(u.getId(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getPhone(), u.getGender(), u.getDob(), u.getRole());
    }
}
