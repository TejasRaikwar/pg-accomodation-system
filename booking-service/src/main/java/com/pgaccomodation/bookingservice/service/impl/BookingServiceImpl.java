package com.pgaccomodation.bookingservice.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pgaccomodation.bookingservice.dto.BookingDetails;
import com.pgaccomodation.bookingservice.dto.BookingWithUsername;
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
/*
	@Override
	public List<BookingDetails> getBookingsByPgAndOwner(Integer pgId, Integer ownerId) {
		PgProperty pg = pgPropertyRepository.findById(pgId)
				.orElseThrow(() -> new ResourceNotFoundException("PG not found"));

		if (!pg.getOwnerId().equals(ownerId)) {
			throw new UnauthorizedAccessException("You are not the owner of this PG");
		}

		List<Booking> bookings = bookingRepository.findByPgId(pgId);

		return bookings.stream().map(booking -> {
			// Call user-service to get user info
			String userServiceUrl = "http://user-service/api/users/" + booking.getUserId();
			String username = "Unknown";

			try {
				var user = restTemplate.getForObject(userServiceUrl, UserInfo.class);
				if (user != null)
					username = user.getUsername();
			} catch (Exception e) {
				// Log error, use fallback username
				username = "Unavailable";
			}

			return new BookingDetails(booking.getId(), booking.getUserId(), username, booking.getPgId(), pg.getName(),
					booking.getStartDate(), booking.getEndDate(), booking.getBookingDate(), booking.getStatus());
		}).collect(Collectors.toList());
	}

	static class UserInfo {
		private String username;

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}
	}
	
	*/
	
	
//	@Override
//    public List<BookingWithUsername> getBookingsWithUsernames(Integer pgId) {
//        return bookingRepository.findAllWithUsernameByPgId(pgId);
//    }
	
	public List<BookingWithUsername> getBookingsWithUserInfoByPgId(Integer pgId, Integer ownerId) {
	    var pg = pgPropertyRepository.findById(pgId)
	            .orElseThrow(() -> new ResourceNotFoundException("PG not found"));

	    if (!pg.getOwnerId().equals(ownerId)) {
	        throw new UnauthorizedAccessException("You are not the owner of this PG.");
	    }

	    return bookingRepository.findBookingsWithUserInfoByPgId(pgId);
	}

	
}
