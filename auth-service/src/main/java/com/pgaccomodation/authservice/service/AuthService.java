package com.pgaccomodation.authservice.service;

import com.pgaccomodation.authservice.dto.AuthRequest;
import com.pgaccomodation.authservice.dto.AuthResponse;
import com.pgaccomodation.authservice.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    void register(RegisterRequest request);
}
