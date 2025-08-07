package com.pgaccomodation.bookingservice.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BookingResponseDTO {
    private Integer id;
    private Integer userId;
    private Integer pgId;
    private PgPropertyDTO pg;
    private LocalDateTime bookingDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
}
