package com.microservice.order_serivce.feign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "AUTH-SERVICE")
public interface AuthClient {
    @GetMapping("/api/auth/{id}")
    boolean doesUserExist(@PathVariable("id") Long id);
}
