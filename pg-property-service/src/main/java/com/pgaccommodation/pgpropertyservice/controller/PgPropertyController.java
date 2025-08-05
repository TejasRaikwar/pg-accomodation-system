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

import com.pgaccommodation.pgpropertyservice.entity.PgProperty;
import com.pgaccommodation.pgpropertyservice.service.PgPropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pg-properties")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PgPropertyController {

	private final PgPropertyService pgPropertyService;

	// Only OWNERs can add PG properties
	@PreAuthorize("hasRole('OWNER')")
	@PostMapping
	public ResponseEntity<PgProperty> addPgProperty(@RequestBody PgProperty pgProperty) {
		return ResponseEntity.ok(pgPropertyService.addPgProperty(pgProperty));
	}

	// Anyone authenticated (ADMIN, OWNER, TENANT) can view all PGs
	@PreAuthorize("isAuthenticated()")
	@GetMapping
	public ResponseEntity<List<PgProperty>> getAllPgProperties() {
		return ResponseEntity.ok(pgPropertyService.getAllPgProperties());
	}

	// Anyone authenticated can search PGs by city
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/city/{city}")
	public ResponseEntity<List<PgProperty>> getPgByCity(@PathVariable String city) {
		return ResponseEntity.ok(pgPropertyService.getPgPropertiesByCity(city));
	}

	// Anyone authenticated can view a single PG
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/{id}")
	public ResponseEntity<PgProperty> getPgById(@PathVariable Integer id) {
		return pgPropertyService.getPgPropertyById(id).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	// Only OWNERs or ADMINs can delete PG
	@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePg(@PathVariable Integer id) {
		pgPropertyService.deletePgProperty(id);
		return ResponseEntity.noContent().build();
	}
}
