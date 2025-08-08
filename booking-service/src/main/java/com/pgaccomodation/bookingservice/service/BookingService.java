package com.pgaccomodation.bookingservice.service;

import java.util.List;
import java.util.Optional;

import com.pgaccomodation.bookingservice.dto.BookingResponseDTO;
import com.pgaccomodation.bookingservice.dto.BookingWithUsername;
import com.pgaccomodation.bookingservice.entity.Booking;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(Integer id);
    List<Booking> getBookingsByUserId(Integer userId);
    List<Booking> getBookingsByPgId(Integer pgId);
    void cancelBooking(Integer id);
    void updateBookingStatus(Integer bookingId, String status);
    public List<Booking> getBookingsByPgIdAndOwner(Integer pgId, Integer ownerId);
    //List<BookingDetails> getBookingsByPgAndOwner(Integer pgId, Integer ownerId);
    //List<BookingWithUsername> getBookingsWithUsernames(Integer pgId);
    public List<BookingWithUsername> getBookingsWithUserInfoByPgId(Integer pgId, Integer ownerId);
    List<BookingResponseDTO> getEnrichedBookingsByUserId(Integer userId);

}
