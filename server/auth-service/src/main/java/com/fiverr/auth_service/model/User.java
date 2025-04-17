package com.fiverr.auth_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.AuthProvider;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Enumerated(EnumType.STRING)
    private Role role;
}
