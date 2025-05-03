package com.microservice.order_serivce.controller;


import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto dto) {
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable Long id) {
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersByBuyer(@PathVariable Long buyerId) {
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersBySeller(@PathVariable Long sellerId) {
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long id, @RequestParam String status) {
    }


    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
    }
}
