package com.microservice.gig_service.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@RequiredArgsConstructor
@Table(name = "gigs")
@Entity
public class Gig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;

    private String title;

    @Column(length = 2000)
    private String description;

    private Double price;
    private String category;

    @ElementCollection
    private List<String> tags;

    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;
    private String videoUrl;
    private String thumbnailUrl;
    private Integer deliveryTime;
    private Integer revisions;
    private boolean isActive = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(name = "impressions")
    private Integer impressions = 0;

    @Column(name = "clicks")
    private Integer clicks = 0;

    @Column(name = "orders")
    private Integer orders = 0;

    @Column(name = "cancellation_rate")
    private Double cancellationRate = 0.0;

}
