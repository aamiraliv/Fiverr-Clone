package com.microservice.order_serivce.service;

import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.repository.OrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;


    public Order placeOrder(Order order) {
        Order order1 = new Order();
        order1.se
    }

    public Order getOrder(Long id) {
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
    }

    public Order updateOrderStatus(Long id, String status) {
    }

    public List<Order> getAllOrders() {
    }
}
