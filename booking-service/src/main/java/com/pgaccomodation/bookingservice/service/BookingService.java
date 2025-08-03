package com.pgaccomodation.bookingservice.service;

import java.util.List;
import java.util.Optional;

import com.pgaccomodation.bookingservice.entity.Booking;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(Integer id);
    List<Booking> getBookingsByUserId(Integer userId);
    List<Booking> getBookingsByPgId(Integer pgId);
    void cancelBooking(Integer id);
}
