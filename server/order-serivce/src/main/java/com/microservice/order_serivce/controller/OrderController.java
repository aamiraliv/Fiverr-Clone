package com.microservice.order_serivce.controller;


import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.model.OrderStatus;
import com.microservice.order_serivce.service.MapperService;
import com.microservice.order_serivce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private MapperService mapperService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto dto) {
        Order order = orderService.placeOrder(dto);
        return ResponseEntity.ok(mapperService.toOrderResponse(order));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        return ResponseEntity.ok(mapperService.toOrderResponse(order));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersByBuyer(@PathVariable Long buyerId) {
        List<Order> orders = orderService.getOrdersByBuyer(buyerId);
        return ResponseEntity.ok(orders.stream().map(mapperService::toOrderResponse).collect(Collectors.toList()));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersBySeller(@PathVariable Long sellerId) {
        List<Order> orders = orderService.getOrdersBySeller(sellerId);
        return ResponseEntity.ok(orders.stream().map(mapperService::toOrderResponse).toList());
    }

    @PutMapping("/freelancer/{id}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long id, @RequestParam OrderStatus status) {
        Order updated = orderService.updateOrderStatus(id,status);
        return ResponseEntity.ok(mapperService.toOrderResponse(updated));
    }


    @GetMapping("/admin")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders.stream().map(mapperService::toOrderResponse).toList());
    }
}
