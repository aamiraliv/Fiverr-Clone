package com.microsevice.auth_service.service;


import com.microsevice.auth_service.Exception.UserAlredyExistException;
import com.microsevice.auth_service.dto.AuthRequest;
import com.microsevice.auth_service.dto.AuthResponse;
import com.microsevice.auth_service.model.Role;
import com.microsevice.auth_service.model.User;
import com.microsevice.auth_service.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Transactional
    public User saveUser(User user) {
        if (repository.existsByEmail(user.getEmail())) {
            throw new UserAlredyExistException("User with email " + user.getEmail() + " already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    public ResponseEntity<?> adminLogin(AuthRequest request, HttpServletResponse response) {
        try {
            if (request == null || request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password must be provided");
            }
            System.out.println("Request Email: " + request.getEmail());

            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("user not found"));

            System.out.println("User Found: " + user.getEmail());

            System.out.println("Role: " + user.getRole());
            System.out.println("Role Class: " + user.getRole().getClass().getName());

            if (user.getRole() != Role.ADMIN) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Access denied: Only admins can log in.");
            }

            System.out.println("🔹 Admin Login Request Received: " + request.getEmail());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            System.out.println("✅ Admin Authentication Successful for: " + request.getEmail());

            String accessToken = jwtService.generateToken(user);
            System.out.println("🔹 Generated Admin Token: " + accessToken);

            String refreshToken = jwtService.generateRefreshToken(user.getEmail());
            System.out.println("🔹 Generated Admin Refresh Token: " + refreshToken);

            addCookie(response, "jwt", accessToken, 3600);
            addCookie(response, "refreshToken", refreshToken, 86400);

            return ResponseEntity.ok(new AuthResponse(
                    accessToken,
                    refreshToken,
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getPicture()));
        } catch (Exception e) {
            System.out.println("❌ Admin Authentication Failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin credentials");
        }
    }


    public ResponseEntity<?> login(AuthRequest request, HttpServletResponse response) {
        try {
            if (request == null || request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password must be provided");
            }
            System.out.println("Request Email: " + request.getEmail());

            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("user not found"));

            System.out.println("User Found: " + user.getEmail());

            System.out.println("🔹 Received Login Request: " + request.getEmail());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            System.out.println("✅ Authentication Successful for: " + request.getEmail());

            String accessToken = jwtService.generateToken(user);
            System.out.println("🔹 Generated Token: " + accessToken);

            String refreshToken = jwtService.generateRefreshToken(user.getEmail());
            System.out.println("🔹 Generated Refresh Token: " + refreshToken);

            addCookie(response, "jwt", accessToken, 3600);
            addCookie(response, "refreshToken", refreshToken, 86400);

            return ResponseEntity.ok(new AuthResponse(
                    accessToken,
                    refreshToken,
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getPicture()));
        } catch (Exception e) {
            System.out.println("❌ Authentication Failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid credentials");
        }

    }

    public Object logout(HttpServletResponse response) {
        clearCookie(response, "jwt");
        clearCookie(response, "refreshToken");
        return ResponseEntity.ok("logout successfully");
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return;

        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                String refreshToken = cookie.getValue();
                String email = jwtService.extractEmail(refreshToken);

                User user = repository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("user not found"));

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtService.validateToken(refreshToken, userDetails)) {
                    String newAccessToken = jwtService.generateToken(user);
                    addCookie(response, "jwt", newAccessToken, 3600);
                    System.out.println("Generated new access token: " + newAccessToken);
                } else {
                    response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid Refresh Token");
                }
                return;
            }
        }
        response.sendError(HttpStatus.UNAUTHORIZED.value(), "No Refresh Token");
    }

    public String extractEmailFromToken(String token) {
        return jwtService.extractEmail(token);
    }


    private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    private void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public User updateProfile(Long id, String picture) {
        User user = repository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("user not found")
        );
        user.setPicture(picture);
        return repository.save(user);
    }
}
