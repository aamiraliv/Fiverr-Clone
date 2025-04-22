package com.microservice.gig_service.service;

import com.microservice.gig_service.feign.AuthClient;
import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import com.microservice.gig_service.repository.GigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class GigService {

    @Autowired
    private GigRepository repository;

    @Autowired
    private AuthClient authClient;

    public GigDTO createGig(GigDTO dto) {
        if (!authClient.doesUserExist(dto.getUserId())){
            throw new RuntimeException("Invalid user ID");
        }
        Gig gig = new Gig();
        gig.setTitle(dto.getTitle());
        gig.setDescription(dto.getDescription());
        gig.setPrice(dto.getPrice());
        gig.setCategory(dto.getCategory());
        gig.setTags(dto.getTags());
        gig.setImageUrl1(dto.getImageUrl1());
        gig.setImageUrl2(dto.getImageUrl2());
        gig.setImageUrl3(dto.getImageUrl3());
        gig.setVideoUrl(dto.getVideoUrl());
        gig.setThumbnailUrl(dto.getThumbnailUrl());
        gig.setDeliveryTime(dto.getDeliveryTime());
        gig.setRevisions(dto.getRevisions());
        gig.setUserId(dto.getUserId());
        gig.setCreatedAt(LocalDateTime.now());
        gig.setUpdatedAt(LocalDateTime.now());

        return repository.save(gig);
    }
}
