package com.fiverr.auth_service.service;

import com.fiverr.auth_service.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtService {

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("roles", List.of(user.getRole()))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(getKey())
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getKey())
                .compact();
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public List<String> extractRoles(String token) {
        return extractClaim(token, claims -> claims.get("roles", List.class));
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(SECRET_KEY));
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String email = extractEmail(token);
            return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (ExpiredJwtException e) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }


    public String extractToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}