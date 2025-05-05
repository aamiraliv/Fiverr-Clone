package com.microservice.review_service.config;

import com.microservice.review_service.dto.ReviewRequest;
import com.microservice.review_service.model.Review;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
