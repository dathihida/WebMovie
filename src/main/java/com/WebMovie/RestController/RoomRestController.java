package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Room;
import com.WebMovie.Service.RoomService;

import jakarta.persistence.criteria.CriteriaBuilder.In;

@CrossOrigin
@RestController
@RequestMapping("/api/room")
public class RoomRestController {
	
	@Autowired
	RoomService roomService;
	
	@GetMapping("/all")
	List<Room> getAlls(){
		return roomService.getAlls();
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	Room addRoom(@RequestBody Room room) {
		return roomService.addRoom(room);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	Room updateRoom(@PathVariable Integer id, @RequestBody Room room) {
		return roomService.updateRoom(room, id);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	void deleteRoom(@PathVariable Integer id) {
		roomService.deleteRoom(id);
	}
	
	@GetMapping("/{id}")
	Room getRoomById(@PathVariable Integer id) {
		return roomService.getRoomById(id);
	}
	
}
