package com.pgaccomodation.authservice.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String userType; // e.g., ADMIN, USER, OWNER
}
