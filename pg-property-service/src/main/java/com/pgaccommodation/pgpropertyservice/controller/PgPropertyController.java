package com.pgaccommodation.pgpropertyservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
@RequiredArgsConstructor
public class PgPropertyController {

	private final PgPropertyService pgPropertyService;

	@PostMapping
	public ResponseEntity<PgProperty> addPgProperty(@RequestBody PgProperty pgProperty) {
		return ResponseEntity.ok(pgPropertyService.addPgProperty(pgProperty));
	}

	@GetMapping
	public ResponseEntity<List<PgProperty>> getAllPgProperties() {
		return ResponseEntity.ok(pgPropertyService.getAllPgProperties());
	}

	@GetMapping("/city/{city}")
	public ResponseEntity<List<PgProperty>> getPgByCity(@PathVariable String city) {
		return ResponseEntity.ok(pgPropertyService.getPgPropertiesByCity(city));
	}

	@GetMapping("/{id}")
	public ResponseEntity<PgProperty> getPgById(@PathVariable Integer id) {
		return pgPropertyService.getPgPropertyById(id).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePg(@PathVariable Integer id) {
		pgPropertyService.deletePgProperty(id);
		return ResponseEntity.noContent().build();
	}
}
