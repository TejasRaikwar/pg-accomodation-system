package com.pgaccomodation.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id") // optional, for clarity
	private Integer userid;
	
	@Column(nullable = false, unique = true, length = 50)
	private String username;
	
	@Column(nullable = false, length = 255)
	private String password;
	
	@Column(nullable = false, unique = true, length = 100)
	private String email;
	
	@Column(nullable = false, length = 15)
	private String phone;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "user_type")
	private UserType userType;
	
	@Column(nullable = false, length = 100)
	private String fullName;
	
	private String profilePic;
	private LocalDateTime createdAt;
	private LocalDateTime lastLogin;
	private Boolean isActive = true;
}
