package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.pgaccommodation.pgpropertyservice.entity.PgProperty;
import com.pgaccommodation.pgpropertyservice.exception.ResourceNotFoundException;
import com.pgaccommodation.pgpropertyservice.repository.PgPropertyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PgPropertyServiceImpl implements PgPropertyService {

	private final PgPropertyRepository pgPropertyRepository;

	@Override
	public PgProperty addPgProperty(PgProperty pgProperty) {
		return pgPropertyRepository.save(pgProperty);
	}

	@Override
	public List<PgProperty> getAllPgProperties() {
		return pgPropertyRepository.findAll();
	}

	@Override
	public List<PgProperty> getPgPropertiesByCity(String city) {
		return pgPropertyRepository.findByCity(city);
	}

	@Override
	public Optional<PgProperty> getPgPropertyById(Integer id) {
		return Optional.of(pgPropertyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PG property not found with id: " + id)));
	}

	@Override
	public void deletePgProperty(Integer id) {
		pgPropertyRepository.deleteById(id);
	}
}
