package com.microservice.order_serivce.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private Long gigId;
    private Long buyerId;
    private Long sellerId;
    private String status;
    private double price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}