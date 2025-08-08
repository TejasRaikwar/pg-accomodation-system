package com.pgaccomodation.bookingservice.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pgaccomodation.bookingservice.dto.BookingResponseDTO;
import com.pgaccomodation.bookingservice.dto.BookingWithUsername;
import com.pgaccomodation.bookingservice.dto.PgPropertyDTO;
import com.pgaccomodation.bookingservice.entity.Booking;
import com.pgaccomodation.bookingservice.entity.PgProperty;
import com.pgaccomodation.bookingservice.exception.ResourceNotFoundException;
import com.pgaccomodation.bookingservice.exception.UnauthorizedAccessException;
import com.pgaccomodation.bookingservice.repository.BookingRepository;
import com.pgaccomodation.bookingservice.repository.PgPropertyRepository;
import com.pgaccomodation.bookingservice.service.BookingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

	private final BookingRepository bookingRepository;
	private final PgPropertyRepository pgPropertyRepository; // ✅ MUST BE FINAL
	private final RestTemplate restTemplate;

	@Override
	public Booking createBooking(Booking booking) {
		booking.setBookingDate(LocalDateTime.now());
		booking.setStatus("PENDING");
		return bookingRepository.save(booking);
	}

	@Override
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	@Override
	public Optional<Booking> getBookingById(Integer id) {
		return bookingRepository.findById(id);
	}

	@Override
	public List<Booking> getBookingsByUserId(Integer userId) {
		return bookingRepository.findByUserId(userId);
	}

	@Override
	public List<Booking> getBookingsByPgId(Integer pgId) {
		return bookingRepository.findByPgId(pgId);
	}

	@Override
	public void cancelBooking(Integer id) {
		bookingRepository.findById(id).ifPresent(booking -> {
			booking.setStatus("CANCELLED");
			bookingRepository.save(booking);
		});
	}

	@Override
	public void updateBookingStatus(Integer bookingId, String status) {
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found with id " + bookingId));

		List<String> allowedStatuses = List.of("PENDING", "CONFIRMED", "CANCELLED");

		if (!allowedStatuses.contains(status.toUpperCase())) {
			throw new IllegalArgumentException("Invalid booking status: " + status);
		}

		booking.setStatus(status.toUpperCase());
		bookingRepository.save(booking);
	}

	public List<Booking> getBookingsByPgIdAndOwner(Integer pgId, Integer ownerId) {
		var pgOpt = pgPropertyRepository.findById(pgId);

		if (pgOpt.isEmpty() || !pgOpt.get().getOwnerId().equals(ownerId)) {
			throw new UnauthorizedAccessException("You are not the owner of this PG.");
		}

		return bookingRepository.findByPgId(pgId);
	}

	
	public List<BookingWithUsername> getBookingsWithUserInfoByPgId(Integer pgId, Integer ownerId) {
	    var pg = pgPropertyRepository.findById(pgId)
	            .orElseThrow(() -> new ResourceNotFoundException("PG not found"));

	    if (!pg.getOwnerId().equals(ownerId)) {
	        throw new UnauthorizedAccessException("You are not the owner of this PG.");
	    }

	    return bookingRepository.findBookingsWithUserInfoByPgId(pgId);
	}

	@Override
	public List<BookingResponseDTO> getEnrichedBookingsByUserId(Integer userId) {
	    List<Booking> bookings = bookingRepository.findByUserId(userId);

	    return bookings.stream().map(booking -> {
	        BookingResponseDTO dto = new BookingResponseDTO();
	        dto.setId(booking.getId());
	        dto.setUserId(booking.getUserId());
	        dto.setPgId(booking.getPgId());
	        dto.setBookingDate(booking.getBookingDate());
	        dto.setStartDate(booking.getStartDate());
	        dto.setEndDate(booking.getEndDate());
	        dto.setStatus(booking.getStatus());

	        PgProperty pg = pgPropertyRepository.findById(booking.getPgId())
	                .orElse(null);

	        if (pg != null) {
	            PgPropertyDTO pgDto = new PgPropertyDTO();
	            pgDto.setPgId(pg.getPgId());
	            pgDto.setOwnerId(pg.getOwnerId());
	            pgDto.setName(pg.getName());
	            pgDto.setAddress(pg.getAddress());
	            pgDto.setCity(pg.getCity());
	            pgDto.setState(pg.getState());
	            pgDto.setPincode(pg.getPincode());
	            pgDto.setLandmark(pg.getLandmark());
	            pgDto.setLatitude(pg.getLatitude());
	            pgDto.setLongitude(pg.getLongitude());
	            pgDto.setDescription(pg.getDescription());
	            pgDto.setTotalRooms(pg.getTotalRooms());
	            pgDto.setAvailableRooms(pg.getAvailableRooms());
	            pgDto.setPricePerBed(pg.getPricePerBed());
	            pgDto.setDepositAmount(pg.getDepositAmount());
	            pgDto.setFoodIncluded(pg.getFoodIncluded());
	            pgDto.setAcAvailable(pg.getAcAvailable());
	            pgDto.setWifiAvailable(pg.getWifiAvailable());
	            pgDto.setLaundryAvailable(pg.getLaundryAvailable());
	            pgDto.setPgType(pg.getPgType().name());
	            pgDto.setRating(pg.getRating());
	            pgDto.setVerified(pg.getVerified());
	            pgDto.setCreatedAt(pg.getCreatedAt());
	            pgDto.setUpdatedAt(pg.getUpdatedAt());

	            dto.setPg(pgDto);
	        }

	        return dto;
	    }).collect(Collectors.toList());
	}

	
}
