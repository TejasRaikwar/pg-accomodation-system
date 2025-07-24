package com.pgaccommodation.pgpropertyservice.controller;

import com.pgaccommodation.pgpropertyservice.entity.Room;
import com.pgaccommodation.pgpropertyservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.addRoom(room));
    }

    @GetMapping("/pg/{pgId}")
    public ResponseEntity<List<Room>> getRoomsByPg(@PathVariable Integer pgId) {
        return ResponseEntity.ok(roomService.getRoomsByPgId(pgId));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }
}
