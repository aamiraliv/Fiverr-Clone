package com.microsevice.auth_service.controller;

import com.microsevice.auth_service.model.User;
import com.microsevice.auth_service.repository.UserRepository;
import com.microsevice.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminAuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UserRepository repository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(service.getAllUsers());
    }

    @PutMapping("/block/{userId}")
    public ResponseEntity<?> blockUser(@PathVariable Long userId){
        User user = repository.findById(userId)
                .orElseThrow(()->new RuntimeException("user not found"));
        user.setBlocked(true);
        repository.save(user);

        return ResponseEntity.ok("user blocked successfully");
    }

    @PutMapping("/unblock/{userId}")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBlocked(false);
        repository.save(user);

        return ResponseEntity.ok("User unblocked successfully.");
    }
}
