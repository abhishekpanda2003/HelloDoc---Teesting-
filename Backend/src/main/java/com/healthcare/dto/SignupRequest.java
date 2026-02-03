package com.healthcare.dto;

import com.healthcare.Entity.UserRole;
import lombok.Data;

@Data
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String gender;
    private String dob; // yyyy-MM-dd
    private UserRole role;
}
