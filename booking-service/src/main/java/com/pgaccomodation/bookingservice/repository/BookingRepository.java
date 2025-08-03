package com.pgaccomodation.bookingservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccomodation.bookingservice.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);
    List<Booking> findByPgId(Integer pgId);
}
