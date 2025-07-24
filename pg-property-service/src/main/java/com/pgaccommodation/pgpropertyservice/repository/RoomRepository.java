package com.pgaccommodation.pgpropertyservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgaccommodation.pgpropertyservice.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByPgId(Integer pgId);
}