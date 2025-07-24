package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;

import com.pgaccommodation.pgpropertyservice.entity.Room;

public interface RoomService {
	Room addRoom(Room room);

	List<Room> getRoomsByPgId(Integer pgId);

	void deleteRoom(Integer roomId);
}
