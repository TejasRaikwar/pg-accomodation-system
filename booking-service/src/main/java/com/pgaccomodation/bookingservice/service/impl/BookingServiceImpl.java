package com.pgaccomodation.bookingservice.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.pgaccomodation.bookingservice.entity.Booking;
import com.pgaccomodation.bookingservice.exception.ResourceNotFoundException;
import com.pgaccomodation.bookingservice.repository.BookingRepository;
import com.pgaccomodation.bookingservice.service.BookingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

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

}
