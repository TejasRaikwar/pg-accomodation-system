package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;
import java.util.Optional;

import com.pgaccommodation.pgpropertyservice.entity.PgProperty;

public interface PgPropertyService {
	PgProperty addPgProperty(PgProperty pgProperty);

	List<PgProperty> getAllPgProperties();

	List<PgProperty> getPgPropertiesByCity(String city);

	Optional<PgProperty> getPgPropertyById(Integer id);

	void deletePgProperty(Integer id);
}