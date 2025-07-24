package com.pgaccomodation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccomodation.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
