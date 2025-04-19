package com.microsevice.auth_service.repository;

import com.microsevice.auth_service.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token , Long> {
}
