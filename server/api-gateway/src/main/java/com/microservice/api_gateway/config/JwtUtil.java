package com.microservice.api_gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class JwtUtil {

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    public String extractTokenFromCookie(List<String> cookies) {
        Optional<String> jwtCookie = cookies.stream()
                .flatMap(cookie -> Arrays.stream(cookie.split(";")))
                .filter(c -> c.trim().startsWith("jwt="))
                .map(c -> c.split("=")[1])
                .findFirst();
        return jwtCookie.orElse(null);
    }
}
