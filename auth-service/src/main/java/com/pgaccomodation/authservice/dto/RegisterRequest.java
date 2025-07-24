package com.pgaccomodation.authservice.dto;

import com.pgaccomodation.authservice.enums.UserType;

import lombok.Data;

@Data
public class RegisterRequest {
	private String username;
	private String password;
	private String email;
	private String phone;
	private String fullName;
	private UserType userType;
}
