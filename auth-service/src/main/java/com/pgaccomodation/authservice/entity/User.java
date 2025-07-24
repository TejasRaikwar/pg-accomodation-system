package com.pgaccomodation.authservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	@Column(nullable = false, unique = true, length = 50)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true, length = 100)
	private String email;

	@Column(nullable = false, length = 15)
	private String phone;

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false)
	private String userType; // admin, owner, tenant

	private String profilePic;

	private boolean isActive = true;
}
