package com.pgaccomodation.bookingservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgaccomodation.bookingservice.dto.BookingWithUsername;
import com.pgaccomodation.bookingservice.entity.Booking;
import com.pgaccomodation.bookingservice.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PreAuthorize("hasRole('TENANT')")
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    @GetMapping("/pg/{pgId}")
    public ResponseEntity<List<Booking>> getByPgId(@PathVariable Integer pgId) {
        return ResponseEntity.ok(bookingService.getBookingsByPgId(pgId));
    }

    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Integer id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{bookingId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'OWNER')")
    public ResponseEntity<String> updateBookingStatus(
            @PathVariable Integer bookingId,
            @RequestParam String status) {

        bookingService.updateBookingStatus(bookingId, status);
        return ResponseEntity.ok("Booking status updated to " + status);
    }
    
//    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
//    @GetMapping("/pg/{pgId}/owner/{ownerId}")
//    public ResponseEntity<List<Booking>> getBookingsForPgByOwner(
//            @PathVariable Integer pgId,
//            @PathVariable Integer ownerId) {
//        return ResponseEntity.ok(bookingService.getBookingsByPgIdAndOwner(pgId, ownerId));
//    }

    
    @PreAuthorize("hasRole('OWNER')")
    @GetMapping("/pg/{pgId}/owner/{ownerId}")
    public ResponseEntity<List<BookingWithUsername>> getEnrichedBookings(
            @PathVariable Integer pgId,
            @PathVariable Integer ownerId) {
        return ResponseEntity.ok(bookingService.getBookingsWithUserInfoByPgId(pgId, ownerId));
    }
    
    
    // Get bookings of a PG (only accessible by the owner)
//    @PreAuthorize("hasRole('OWNER')")
//    @GetMapping("/pg/{pgId}/owner/{ownerId}")
//    public ResponseEntity<List<BookingDetails>> getBookingsByPgAndOwner(
//            @PathVariable Integer pgId,
//            @PathVariable Integer ownerId) {
//        List<BookingDetails> result = bookingService.getBookingsByPgAndOwner(pgId, ownerId);
//        return ResponseEntity.ok(result);
//    }
    
    
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    @GetMapping("/pg/{pgId}/with-usernames")
    public ResponseEntity<List<BookingWithUsername>> getBookingsWithUsernames(@PathVariable Integer pgId) {
        return ResponseEntity.ok(bookingService.getBookingsWithUsernames(pgId));
    }

}
