package com.pgaccomodation.authservice.service;

import com.pgaccomodation.authservice.entity.User;
import com.pgaccomodation.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(Collections.emptyList()) // you can add roles later
                .accountLocked(false)
                .accountExpired(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();

    }
}
