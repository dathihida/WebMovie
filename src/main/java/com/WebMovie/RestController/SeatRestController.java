package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Seat;
import com.WebMovie.Service.SeatService;

@CrossOrigin
@RestController
@RequestMapping("/api/seat")
public class SeatRestController {

	@Autowired
	SeatService seatService;

	@GetMapping("/all")
	List<Seat> getAll(){
		return seatService.getAll();
	}

	@GetMapping("/{id}")
	List<Seat> listSeatByIdRoom(@PathVariable("id") Integer id){
		return seatService.ListSeatByIdRoom(id);
	}
}
