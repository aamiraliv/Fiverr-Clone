package com.microservice.order_serivce.config;

import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.model.Order;
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
