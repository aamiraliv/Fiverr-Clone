package com.microservice.order_serivce.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {
    private Long gigId;
    private Long buyerId;
    private Long sellerId;
    private double price;
}