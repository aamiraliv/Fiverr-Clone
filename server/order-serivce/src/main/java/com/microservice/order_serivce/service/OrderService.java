package com.microservice.order_serivce.service;

import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.feign.AuthClient;
import com.microservice.order_serivce.feign.GigClient;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.model.OrderStatus;
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

    @Autowired
    private AuthClient authClient;

    @Autowired
    private GigClient gigClient;

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("order not found")
        );
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public Order updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("order not found")
        );
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    public Order placeOrder(OrderRequestDto dto) {

        if (!authClient.doesUserExist(dto.getBuyerId())) {
            throw new RuntimeException("Buyer does not exist");
        }

        if (!authClient.doesUserExist(dto.getSellerId())) {
            throw new RuntimeException("Seller does not exist");
        }

        if (!gigClient.doesGigExist(dto.getGigId())) {
            throw new RuntimeException("Gig does not exist");
        }


        Order order = new Order();
        order.setBuyerId(dto.getBuyerId());
        order.setSellerId(dto.getSellerId());
        order.setPrice(dto.getPrice());
        order.setGigId(dto.getGigId());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        return orderRepository.save(order);
    }
}
