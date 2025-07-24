package com.pgaccommodation.pgpropertyservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer roomId;

	private Integer pgId;

	private String roomNumber;

	@Enumerated(EnumType.STRING)
	private SharingType sharingType;

	private Integer bedsAvailable;
	private Boolean acAvailable;

	private BigDecimal rentAmount;

	@Enumerated(EnumType.STRING)
	private RoomStatus status;

	public enum SharingType {
		ONE, TWO, THREE, FOUR, FOUR_PLUS
	}

	public enum RoomStatus {
		AVAILABLE, OCCUPIED, MAINTENANCE
	}
}
