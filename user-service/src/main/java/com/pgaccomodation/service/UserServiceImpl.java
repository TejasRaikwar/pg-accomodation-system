package com.pgaccomodation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pgaccomodation.entity.User;
import com.pgaccomodation.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User registerUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public Optional<User> getUserById(Integer id) {
		return userRepository.findById(id);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User updateUser(Integer id, User updatedUser) {
		return userRepository.findById(id).map(existingUser -> {
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setPhone(updatedUser.getPhone());
			existingUser.setFullName(updatedUser.getFullName());
			existingUser.setProfilePic(updatedUser.getProfilePic());
			existingUser.setIsActive(updatedUser.getIsActive());
			return userRepository.save(existingUser);
		}).orElseThrow(() -> new RuntimeException("User not found"));
	}

	@Override
	public void deleteUser(Integer id) {
		userRepository.deleteById(id);
	}

}
