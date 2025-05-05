package com.microservice.review_service.service;

import com.microservice.review_service.dto.ReviewRequest;
import com.microservice.review_service.dto.ReviewResponse;
import com.microservice.review_service.model.Review;
import com.microservice.review_service.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private MapperService mapperService;

    public ReviewResponse createReview(ReviewRequest request) {
        boolean exist = repository.existsByGigIdAndBuyerId(request.getGigId(),request.getBuyerId());
        if (exist){
            throw new IllegalArgumentException("You have already reviewed this gig.");
        }
        Review review = new Review();
        review.setCreatedAt(LocalDateTime.now());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setGigId(request.getGigId());
        review.setSellerId(request.getSellerId());
        review.setBuyerId(request.getBuyerId());

        Review saved = repository.save(review);
        return mapperService.toOrderResponse(saved);
    }

    public List<ReviewResponse> getReviewsByGig(Long gigId) {
        List<Review> reviews = repository.findByGigId(gigId);
        return reviews.stream().map(mapperService::toOrderResponse).toList();
    }

    public Double getAverageRatingForGig(Long gigId) {
        List<Review> reviews = repository.findByGigId(gigId);
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

    public Double getAverageRatingForSeller(Long sellerId) {
        List<Review> reviews = repository.findBySellerId(sellerId);
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}
