package com.microservice.review_service.repository;

import com.microservice.review_service.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review , Long> {
    List<Review> findByGigId(Long gigId);
    List<Review> findBySellerId(Long sellerId);
    boolean existsByGigIdAndBuyerId(Long gigId, Long buyerId);
}
