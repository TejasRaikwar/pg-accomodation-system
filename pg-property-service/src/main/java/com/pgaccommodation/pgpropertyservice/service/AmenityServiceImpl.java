package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgaccommodation.pgpropertyservice.entity.Amenity;
import com.pgaccommodation.pgpropertyservice.repository.AmenityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AmenityServiceImpl implements AmenityService {

	private final AmenityRepository amenityRepository;

	@Override
	public Amenity addAmenity(Amenity amenity) {
		return amenityRepository.save(amenity);
	}

	@Override
	public List<Amenity> getAmenitiesByPgId(Integer pgId) {
		return amenityRepository.findByPgId(pgId);
	}

	@Override
	public void deleteAmenity(Integer amenityId) {
		amenityRepository.deleteById(amenityId);
	}
}
