package com.microservice.order_serivce.controller;


import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.model.OrderStatus;
import com.microservice.order_serivce.service.MapperService;
import com.microservice.order_serivce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freelancer")
public class FreelancerControll {

    @Autowired
    private OrderService orderService;

    @Autowired
    private MapperService mapperService;

    @PutMapping("/order/{id}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long id, @RequestParam OrderStatus status) {
        Order updated = orderService.updateOrderStatus(id,status);
        return ResponseEntity.ok(mapperService.toOrderResponse(updated));
    }

}
