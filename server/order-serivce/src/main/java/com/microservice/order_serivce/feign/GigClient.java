package com.microservice.order_serivce.feign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "GIG-SERVICE")
public interface GigClient {
    @GetMapping("/api/gig/check/{id}")
    boolean doesGigExist(@PathVariable("id") Long id);
}
