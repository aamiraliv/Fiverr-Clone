package com.microservice.gig_service.controller;

import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import com.microservice.gig_service.service.GigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gig")
public class GigController {

    @Autowired
    private GigService service;

    @PostMapping
    public ResponseEntity<GigDTO> createGig(@RequestBody GigDTO dto) {
        return new ResponseEntity<>(service.createGig(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GigDTO> updateGig(@PathVariable Long id, @RequestBody GigDTO dto) {
        return ResponseEntity.ok(service.updateGig(id,dto));
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
    public List<GigDTO> getAllGigs() {
        return ResponseEntity.ok(service.getAllGigs());
    }

    @GetMapping("/freelancer/{freelancerId}")
    public List<GigDTO> getGigsByFreelancer(@PathVariable Long freelancerId) {
        return ResponseEntity.ok(service.getGigsByFreelancer(freelancerId));
    }

    @GetMapping("/search")
    public List<GigDTO> searchGigs(@RequestParam String query) {
        return ResponseEntity.ok(service.searchGigs(query));
    }

    @GetMapping("/filter")
    public List<GigDTO> filterGigs(@RequestParam String category) {
        return ResponseEntity.ok(service.filterGigs(category));
    }
}
