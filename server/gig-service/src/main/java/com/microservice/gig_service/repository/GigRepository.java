package com.microservice.gig_service.repository;

import com.microservice.gig_service.model.Gig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GigRepository extends JpaRepository<Gig , Long> {
}
