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
	
	@Override
	public List<PgProperty> getPgPropertiesByOwnerId(Integer ownerId) {
	    return pgPropertyRepository.findByOwnerId(ownerId);
	}
	
	@Override
    public PgProperty updatePgProperty(Integer id, PgProperty pgProperty) {
        PgProperty existing = pgPropertyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("PG not found"));
        // Update all fields
        existing.setName(pgProperty.getName());
        existing.setOwnerId(pgProperty.getOwnerId());
        existing.setAddress(pgProperty.getAddress());
        existing.setCity(pgProperty.getCity());
        existing.setState(pgProperty.getState());
        existing.setPincode(pgProperty.getPincode());
        existing.setLandmark(pgProperty.getLandmark());
        existing.setLatitude(pgProperty.getLatitude());
        existing.setLongitude(pgProperty.getLongitude());
        existing.setDescription(pgProperty.getDescription());
        existing.setTotalRooms(pgProperty.getTotalRooms());
        existing.setAvailableRooms(pgProperty.getAvailableRooms());
        existing.setPricePerBed(pgProperty.getPricePerBed());
        existing.setDepositAmount(pgProperty.getDepositAmount());
        existing.setFoodIncluded(pgProperty.getFoodIncluded());
        existing.setAcAvailable(pgProperty.getAcAvailable());
        existing.setWifiAvailable(pgProperty.getWifiAvailable());
        existing.setLaundryAvailable(pgProperty.getLaundryAvailable());
        existing.setPgType(pgProperty.getPgType());
        existing.setRating(pgProperty.getRating());
        existing.setVerified(pgProperty.getVerified());
        // Add any other fields as needed
        return pgPropertyRepository.save(existing);
    }

}
