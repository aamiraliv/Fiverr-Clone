package com.microservice.gig_service.controller;

import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import com.microservice.gig_service.service.GigService;
import com.microservice.gig_service.service.MediaUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gig")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class GigController {

    @Autowired
    private GigService service;

    @Autowired
    private MediaUploadService uploadService;

    @PostMapping
    public ResponseEntity<GigDTO> createGig(@RequestBody GigDTO dto) {
        return new ResponseEntity<>(service.createGig(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GigDTO> updateGig(@PathVariable Long id, @RequestBody GigDTO dto) {
        return ResponseEntity.ok(service.updateGig(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGig(@PathVariable Long id) {
        service.deleteGig(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GigDTO> getGig(@PathVariable Long id) {
        return ResponseEntity.ok(service.getGig(id));
    }

    @GetMapping
    public ResponseEntity<List<GigDTO>> getAllGigs() {
        return ResponseEntity.ok(service.getAllGigs());
    }

    @GetMapping("/freelancer/{userId}")
    public ResponseEntity<List<GigDTO>> getGigsByFreelancer(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getGigsByFreelancer(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<GigDTO>> searchGigs(@RequestParam String query) {
        return ResponseEntity.ok(service.searchGigs(query));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<GigDTO>> filterGigs(@RequestParam String category) {
        return ResponseEntity.ok(service.filterGigs(category));
    }

    @PostMapping("/freelancer/upload")
    public ResponseEntity<?> uploadMedial(@RequestParam("file") MultipartFile file) {
        try {
            String media_url = uploadService.uploadMedia(file);
            return ResponseEntity.ok().body(Map.of("media_url", media_url));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Image upload failed"));
        }
    }

    @GetMapping("/check/{id}")
    public boolean doesGigExist(@PathVariable Long id) {
        return service.existsById(id);
    }
}
