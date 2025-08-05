package com.pgaccommodation.pgpropertyservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgaccommodation.pgpropertyservice.entity.Amenity;
import com.pgaccommodation.pgpropertyservice.service.AmenityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/amenities")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityService amenityService;

    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<Amenity> addAmenity(@RequestBody Amenity amenity) {
        return ResponseEntity.ok(amenityService.addAmenity(amenity));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/pg/{pgId}")
    public ResponseEntity<List<Amenity>> getAmenitiesByPg(@PathVariable Integer pgId) {
        return ResponseEntity.ok(amenityService.getAmenitiesByPgId(pgId));
    }

    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    @DeleteMapping("/{amenityId}")
    public ResponseEntity<Void> deleteAmenity(@PathVariable Integer amenityId) {
        amenityService.deleteAmenity(amenityId);
        return ResponseEntity.noContent().build();
    }
}
