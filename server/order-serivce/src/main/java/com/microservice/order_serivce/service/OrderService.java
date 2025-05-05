package com.microservice.order_serivce.service;

import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MapperService mapperService;


//    public OrderResponseDto placeOrder(Order order) {
//        order.setCreatedAt(LocalDateTime.now());
//        order.setUpdatedAt(LocalDateTime.now());
//        order.setStatus("PENDING");
//        return mapperService.toOrderResponse(orderRepository.save(order));
//    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("order not found")
        );
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("order not found")
        );
        order.setStatus(status);
        return  orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    public Order placeOrder(OrderRequestDto dto) {
        Order order = mapperService.toOrderEntity(dto);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus("PENDING");
        return  orderRepository.save(order);
    }
}
