package com.fiverr.auth_service.config;

import com.fiverr.auth_service.service.CustomUserDetailsService;
import com.fiverr.auth_service.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();

        // Skip JWT validation for authentication endpoints
        if (requestPath.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("Auth Service - Authorization Header: " + request.getHeader("Authorization"));

        String token = jwtService.extractToken(request);
        if (token == null || token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String email = jwtService.extractEmail(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
            System.out.println("Authorities :-" + userDetails.getAuthorities());

            if (token != null && jwtService.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (ExpiredJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
            return;
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return;
        }

        filterChain.doFilter(request, response);
    }
}