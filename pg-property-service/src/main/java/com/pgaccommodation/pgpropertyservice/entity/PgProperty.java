package com.pgaccommodation.pgpropertyservice.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pg_properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PgProperty {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pgId;

	private Integer ownerId;

	private String name;

	@Column(columnDefinition = "TEXT")
	private String address;

	private String city;
	private String state;
	private String pincode;
	private String landmark;

	private Double latitude;
	private Double longitude;

	@Column(columnDefinition = "TEXT")
	private String description;

	private Integer totalRooms;
	private Integer availableRooms;

	private BigDecimal pricePerBed;
	private BigDecimal depositAmount;

	private Boolean foodIncluded;
	private Boolean acAvailable;
	private Boolean wifiAvailable;
	private Boolean laundryAvailable;

	@Enumerated(EnumType.STRING)
	private PgType pgType;

	private BigDecimal rating;
	private Boolean verified;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	public enum PgType {
		MALE_ONLY, FEMALE_ONLY, UNISEX
	}
}
