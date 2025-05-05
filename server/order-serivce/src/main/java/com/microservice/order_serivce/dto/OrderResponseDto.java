package com.microservice.order_serivce.dto;

import com.microservice.order_serivce.model.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private int gigId;
    private int buyerId;
    private int sellerId;
    private OrderStatus status;
    private double price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}