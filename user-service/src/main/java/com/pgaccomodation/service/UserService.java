package com.pgaccomodation.service;

import java.util.List;
import java.util.Optional;

import com.pgaccomodation.entity.User;

public interface UserService {
	User registerUser(User user);

	Optional<User> getUserById(Integer id);

	List<User> getAllUsers();

	Optional<User> getUserByUsername(String username);

	User updateUser(Integer id, User updatedUser);

	void deleteUser(Integer id);
}
