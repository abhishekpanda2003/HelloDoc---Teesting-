package com.healthcare.service;

import com.healthcare.dto.AppointmentRequest;

public interface AppointmentService {
    void bookAppointment(AppointmentRequest req);
}
