package com.fiverr.auth_service.repository;

import com.fiverr.auth_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<User , Long> {
    Optional<User> findByEmail(String  email);
}
