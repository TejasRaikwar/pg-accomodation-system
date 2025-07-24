package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;

import com.pgaccommodation.pgpropertyservice.entity.Amenity;

public interface AmenityService {
	Amenity addAmenity(Amenity amenity);

	List<Amenity> getAmenitiesByPgId(Integer pgId);

	void deleteAmenity(Integer amenityId);
}
