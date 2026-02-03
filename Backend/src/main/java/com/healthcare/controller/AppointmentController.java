package com.healthcare.controller;

import com.healthcare.dto.AppointmentRequest;
import com.healthcare.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<Void> book(@RequestBody AppointmentRequest req) {
        appointmentService.bookAppointment(req);
        return ResponseEntity.ok().build();
    }
}
