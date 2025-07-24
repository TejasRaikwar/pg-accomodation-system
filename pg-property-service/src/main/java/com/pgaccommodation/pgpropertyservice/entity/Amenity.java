package com.pgaccommodation.pgpropertyservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "amenities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Amenity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer amenityId;

	private Integer pgId;

	private String amenityName;
	private Boolean available;

	private BigDecimal additionalCost;
}
