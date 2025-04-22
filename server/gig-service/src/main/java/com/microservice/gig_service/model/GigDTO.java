package com.microservice.gig_service.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Data
@RequiredArgsConstructor
public class GigDTO {

    private String title;
    private String description;
    private Double price;
    private String category;
    private List<String> tags;

    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;

    private String videoUrl;
    private String thumbnailUrl;

    private Integer deliveryTime;
    private Integer revisions;

    private Long UserId;
}
