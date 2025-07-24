package com.pgaccommodation.pgpropertyservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pgaccommodation.pgpropertyservice.entity.Room;
import com.pgaccommodation.pgpropertyservice.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;

	@Override
	public Room addRoom(Room room) {
		return roomRepository.save(room);
	}

	@Override
	public List<Room> getRoomsByPgId(Integer pgId) {
		return roomRepository.findByPgId(pgId);
	}

	@Override
	public void deleteRoom(Integer roomId) {
		roomRepository.deleteById(roomId);
	}
}
