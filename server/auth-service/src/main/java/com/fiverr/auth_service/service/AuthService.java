package com.fiverr.auth_service.service;

import com.fiverr.auth_service.model.User;
import com.fiverr.auth_service.repository.AuthRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.io.IOException;

public class AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthRepository repository;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return;

        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                String refreshToken = cookie.getValue();
                String email = jwtService.extractEmail(refreshToken);

                User user = repository.findByEmail(email)
                        .orElseThrow(()->new UsernameNotFoundException("user not found"));

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtService.validateToken(refreshToken,userDetails)){
                    String newAccessToken = jwtService.generateToken(user);
                    addCookie(response,"jwt",newAccessToken,3600);
                    System.out.println("Generated new access token: " + newAccessToken);
                }else {
                    response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid Refresh Token");
                }
                return;
            }
        }
        response.sendError(HttpStatus.UNAUTHORIZED.value(), "No Refresh Token");
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

}
