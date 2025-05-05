package com.microservice.order_serivce.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {
    private int gigId;
    private int buyerId;
    private int sellerId;
    private double price;
}