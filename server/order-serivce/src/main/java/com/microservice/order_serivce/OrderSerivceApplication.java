package com.microservice.order_serivce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class OrderSerivceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderSerivceApplication.class, args);
    }

}
