package com.microservice.order_serivce.service;


import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.model.Order;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
    @Autowired
    private ModelMapper modelMapper;


    public OrderResponseDto toOrderResponse(Order order) {
        return modelMapper.map(order, OrderResponseDto.class);
    }


    public Order toOrderEntity(OrderRequestDto request) {
        return modelMapper.map(request, Order.class);
    }
}
