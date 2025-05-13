package com.microservice.gig_service.service;

import com.microservice.gig_service.feign.AuthClient;
import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import com.microservice.gig_service.repository.GigRepository;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GigService {

    @Autowired
    private GigRepository repository;

    @Autowired
    private MapperService mapperService;

    @Autowired
    private AuthClient authClient;

    public Gig createGig(GigDTO dto) {
        if (!authClient.doesUserExist(dto.getUserId())) {
            throw new RuntimeException("Invalid user ID");
        }
        try {
            Gig gig = mapperService.toEntity(dto);
            gig.setCreatedAt(LocalDateTime.now());
            gig.setUpdatedAt(LocalDateTime.now());
            return repository.save(gig);

        } catch (Exception e) {
            throw new RuntimeException("Failed to create product: " + e.getMessage());
        }

    }

    public Gig updateGig(Long id, GigDTO dto) {
        Gig gig = repository.findById(id).orElseThrow(() -> new RuntimeException(" gig not found "));
        gig.setTitle(dto.getTitle());
        gig.setDescription(dto.getDescription());
        gig.setCategory(dto.getCategory());
        gig.setTags(dto.getTags());
        gig.setImageUrl1(dto.getImageUrl1());
        gig.setImageUrl2(dto.getImageUrl2());
        gig.setImageUrl3(dto.getImageUrl3());
        gig.setVideoUrl(dto.getVideoUrl());
        gig.setThumbnailUrl(dto.getThumbnailUrl());
        gig.setPrice(dto.getPrice());
        gig.setDeliveryTime(dto.getDeliveryTime());
        gig.setRevisions(dto.getRevisions());
        gig.setUpdatedAt(LocalDateTime.now());

        return repository.save(gig);
    }

    public void deleteGig(Long id) {
        repository.deleteById(id);
    }

    public Gig getGig(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("gig not found"));

    }


    public List<Gig> getAllGigs() {
        return repository.findAll();
    }


    public List<Gig> getGigsByFreelancer(Long userId) {
        return repository.findByUserId(userId);
    }


    public List<Gig> filterGigs(String category) {
        return repository.findByCategoryContainingIgnoreCase(category);
    }

    public List<Gig> searchGigs(String query) {
        return repository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}
