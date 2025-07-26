package com.pgaccomodation.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgaccomodation.entity.User;
import com.pgaccomodation.service.UserService;
import com.pgaccomodation.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtil jwtUtil;

	// Register new user
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		User registered = userService.registerUser(user);
		return ResponseEntity.ok(registered);
	}

	// Get user by ID
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
		Optional<User> user = userService.getUserById(id);
		return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// Get all users
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

	// Get user by username
	@GetMapping("/username/{username}")
	public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
		Optional<User> user = userService.getUserByUsername(username);
		return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// Update user
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
		try {
			User user = userService.updateUser(id, updatedUser);
			return ResponseEntity.ok(user);
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}

	// Delete user
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/me")
	public ResponseEntity<User> getCurrentUser(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		String username = jwtUtil.extractUsername(token);
		return userService.getUserByUsername(username).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

}
