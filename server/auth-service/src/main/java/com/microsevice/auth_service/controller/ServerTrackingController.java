package com.microsevice.auth_service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ServerTrackingController {

    private static final Logger logger = LoggerFactory.getLogger(ServerTrackingController.class);

    @GetMapping("/track")
    public String trackServer() {
        logger.info("Received request to /api/track at {}", System.currentTimeMillis());
        return "Server is running!";
    }
}
