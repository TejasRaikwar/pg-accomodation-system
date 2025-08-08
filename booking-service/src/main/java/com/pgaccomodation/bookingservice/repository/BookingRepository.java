package com.pgaccomodation.bookingservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pgaccomodation.bookingservice.dto.BookingWithUsername;
import com.pgaccomodation.bookingservice.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);
    List<Booking> findByPgId(Integer pgId);
    
    @Query(value = """
    	    SELECT 
    	        b.id,
    	        b.user_id AS userId,
    	        u.username AS username,
    	        u.full_name AS fullName,
    	        b.pg_id AS pgId,
    	        b.status,
    	        b.start_date AS startDate,
    	        b.end_date AS endDate,
    	        b.booking_date AS bookingDate
    	    FROM bookings b
    	    JOIN users u ON b.user_id = u.user_id
    	    WHERE b.pg_id = :pgId
    	""", nativeQuery = true)
    	List<BookingWithUsername> findBookingsWithUserInfoByPgId(@Param("pgId") Integer pgId);


}
