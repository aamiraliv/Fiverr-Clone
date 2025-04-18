package com.fiverr.auth_service.oauth;


import com.fiverr.auth_service.model.User;
import com.fiverr.auth_service.repository.AuthRepository;
import com.fiverr.auth_service.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private JwtService jwtService;

    @Autowired
    private AuthRepository repository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String email = authentication.getName();
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(email);

        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(604800);

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        response.sendRedirect("http://localhost:5173/");
    }
}