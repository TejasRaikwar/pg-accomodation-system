package com.pgaccomodation.bookingservice.dto;

public interface BookingWithUsername {
    Integer getId();
    Integer getUserId();
    String getUsername(); // from users table
    Integer getPgId();
    String getStatus();
    java.time.LocalDateTime getStartDate();
    java.time.LocalDateTime getEndDate();
    java.time.LocalDateTime getBookingDate();
}