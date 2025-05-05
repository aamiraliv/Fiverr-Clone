package com.microservice.review_service.service;

import com.microservice.review_service.dto.ReviewRequest;
import com.microservice.review_service.dto.ReviewResponse;
import com.microservice.review_service.model.Review;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
    @Autowired
    private ModelMapper modelMapper;


    public ReviewResponse toOrderResponse(Review order) {
        return modelMapper.map(order, ReviewResponse.class);
    }


    public Review toOrderEntity(ReviewRequest request) {
        return modelMapper.map(request, Review.class);
    }
}
