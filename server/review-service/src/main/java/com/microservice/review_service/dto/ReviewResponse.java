package com.microservice.review_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long id;
    private int gigId;
    private int buyerId;
    private int sellerId;
    private String comment;
    private int rating;
    private LocalDateTime createdAt;
}
