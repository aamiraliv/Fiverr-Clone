package com.microsevice.auth_service.dto;

import com.microsevice.auth_service.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String username;
    private String email;
    private Role role;
}

