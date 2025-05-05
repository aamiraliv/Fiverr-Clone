package com.microservice.review_service.repository;

import com.microservice.review_service.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review , Long> {
}
