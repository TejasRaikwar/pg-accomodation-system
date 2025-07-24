package com.pgaccomodation.util;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pgaccomodation.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	com.pgaccomodation.entity.User appUser = userRepository.findByUsername(username)
    		    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    		return new org.springframework.security.core.userdetails.User(
    		    appUser.getUsername(),
    		    appUser.getPassword(),
    		    new ArrayList<>() // you can pass roles here later
    		);

    }
}
