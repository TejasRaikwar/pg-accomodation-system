package com.pgaccomodation.bookingservice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PgPropertyDTO {
    private Integer pgId;
    private Integer ownerId;
    private String name;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String landmark;
    private Double latitude;
    private Double longitude;
    private String description;
    private Integer totalRooms;
    private Integer availableRooms;
    private BigDecimal pricePerBed;
    private BigDecimal depositAmount;
    private Boolean foodIncluded;
    private Boolean acAvailable;
    private Boolean wifiAvailable;
    private Boolean laundryAvailable;
    private String pgType;
    private BigDecimal rating;
    private Boolean verified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
