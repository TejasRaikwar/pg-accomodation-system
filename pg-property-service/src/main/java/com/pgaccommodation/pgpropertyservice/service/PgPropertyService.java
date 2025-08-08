package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;
import java.util.Optional;

import com.pgaccommodation.pgpropertyservice.entity.PgProperty;

public interface PgPropertyService {
	PgProperty addPgProperty(PgProperty pgProperty);

	List<PgProperty> getAllPgProperties();

	List<PgProperty> getPgPropertiesByCity(String city);
	
	List<PgProperty> getPgPropertiesByOwnerId(Integer ownerId);

	Optional<PgProperty> getPgPropertyById(Integer id);

	void deletePgProperty(Integer id);
	
	PgProperty updatePgProperty(Integer id, PgProperty pgProperty);
}