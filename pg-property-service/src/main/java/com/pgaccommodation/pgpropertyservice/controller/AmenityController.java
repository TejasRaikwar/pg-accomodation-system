package com.pgaccommodation.pgpropertyservice.controller;

import com.pgaccommodation.pgpropertyservice.entity.Amenity;
import com.pgaccommodation.pgpropertyservice.service.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityService amenityService;

    @PostMapping
    public ResponseEntity<Amenity> addAmenity(@RequestBody Amenity amenity) {
        return ResponseEntity.ok(amenityService.addAmenity(amenity));
    }

    @GetMapping("/pg/{pgId}")
    public ResponseEntity<List<Amenity>> getAmenitiesByPg(@PathVariable Integer pgId) {
        return ResponseEntity.ok(amenityService.getAmenitiesByPgId(pgId));
    }

    @DeleteMapping("/{amenityId}")
    public ResponseEntity<Void> deleteAmenity(@PathVariable Integer amenityId) {
        amenityService.deleteAmenity(amenityId);
        return ResponseEntity.noContent().build();
    }
}
