package com.healthcare.controller;

import com.healthcare.dto.LoginRequest;
import com.healthcare.dto.SignupRequest;
import com.healthcare.dto.UserResponse;
import com.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest req) {
        UserResponse resp = userService.signup(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest req) {
        UserResponse resp = userService.login(req);
        return ResponseEntity.ok(resp);
    }
}
