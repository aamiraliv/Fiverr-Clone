package com.microservice.review_service.controller;

import com.microservice.review_service.dto.ReviewRequest;
import com.microservice.review_service.dto.ReviewResponse;
import com.microservice.review_service.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping("/gig/{gigId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsForGig(@PathVariable Long gigId) {
        return ResponseEntity.ok(reviewService.getReviewsByGig(gigId));
    }

    @GetMapping("/gig/{gigId}/average-rating")
    public ResponseEntity<Double> getAverageRatingForGig(@PathVariable Long gigId) {
        return ResponseEntity.ok(reviewService.getAverageRatingForGig(gigId));
    }

    @GetMapping("/seller/{sellerId}/average-rating")
    public ResponseEntity<Double> getAverageRatingForSeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(reviewService.getAverageRatingForSeller(sellerId));
    }


}
