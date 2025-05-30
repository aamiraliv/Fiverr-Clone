package com.microservice.order_serivce.service;

import com.microservice.order_serivce.dto.OrderRequestDto;
import com.microservice.order_serivce.dto.OrderResponseDto;
import com.microservice.order_serivce.feign.AuthClient;
import com.microservice.order_serivce.feign.GigClient;
import com.microservice.order_serivce.model.Order;
import com.microservice.order_serivce.model.OrderStatus;
import com.microservice.order_serivce.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private PaymentService paymentService;

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

    public Order placeOrder(OrderRequestDto dto) throws StripeException {

        if (!authClient.doesUserExist(dto.getBuyerId())) {
            throw new RuntimeException("Buyer does not exist");
        }

        if (!authClient.doesUserExist(dto.getSellerId())) {
            throw new RuntimeException("Seller does not exist");
        }

        if (!gigClient.doesGigExist(dto.getGigId())) {
            throw new RuntimeException("Gig does not exist");
        }

        Order order = Order.builder()
                .buyerId(dto.getBuyerId())
                .sellerId(dto.getSellerId())
                .price(dto.getPrice())
                .gigId(dto.getGigId())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .build();

        order = orderRepository.save(order);

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(dto.getPrice(), "usd", order.getId(), dto.getSellerId());
        order.setPaymentIntentId(paymentIntent.getId());
        order.setPaymentStatus(paymentIntent.getStatus());
        order.setClientSecret(paymentIntent.getClientSecret());

        return orderRepository.save(order);


    }

    public Order confirmOrderPayment(Long orderId, String paymentIntentId) throws StripeException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String paymentStatus = paymentService.confirmPaymentIntent(paymentIntentId);
        order.setPaymentStatus(paymentStatus);

        if ("succeeded".equals(paymentStatus)) {
            order.setStatus(OrderStatus.IN_PROGRESS);
        }else if ("requires_payment_method".equals(paymentStatus)) {
            order.setStatus(OrderStatus.PENDING);
            throw new RuntimeException("Payment method required. Please provide a valid payment method.");
        }else {
            order.setStatus(OrderStatus.CANCELLED);
            throw new RuntimeException("Payment failed with status: " + paymentStatus);
        }
        return orderRepository.save(order);
    }
}
