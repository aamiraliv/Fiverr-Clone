package com.microservice.order_serivce.dto;

import com.microservice.order_serivce.model.OrderStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusUpdateDto {
    private OrderStatus status;
}