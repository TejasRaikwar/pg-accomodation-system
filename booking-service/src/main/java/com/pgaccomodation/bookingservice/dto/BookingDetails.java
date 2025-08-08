package com.pgaccomodation.bookingservice.dto;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetails {
    private Integer id;
    private Integer userId;
    private String username;
    private Integer pgId;
    private String pgName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime bookingDate;
    private String status;
}
