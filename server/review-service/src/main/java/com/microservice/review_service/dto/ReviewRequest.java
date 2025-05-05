package com.microservice.review_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private Long gigId;
    private Long buyerId;
    private Long sellerId;
    private String comment;
    private int rating;
}
