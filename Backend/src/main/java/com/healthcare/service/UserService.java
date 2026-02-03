package com.healthcare.service;

import com.healthcare.dto.LoginRequest;
import com.healthcare.dto.SignupRequest;
import com.healthcare.dto.UserResponse;

public interface UserService {
    UserResponse signup(SignupRequest req);
    UserResponse login(LoginRequest req);
    UserResponse getById(Long id);
}
