package com.pgaccommodation.pgpropertyservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccommodation.pgpropertyservice.entity.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
	List<Amenity> findByPgId(Integer pgId);
}