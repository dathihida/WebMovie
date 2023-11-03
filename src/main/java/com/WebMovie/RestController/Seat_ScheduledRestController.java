package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Seat_Scheduled;
import com.WebMovie.Service.Seat_ScheduledService;

@CrossOrigin
@RestController
@RequestMapping("/api/seat_scheduled")
public class Seat_ScheduledRestController {
	
	@Autowired
	Seat_ScheduledService seat_ScheduledService;
	
	@GetMapping("/all")
	
	List<Seat_Scheduled> getAll(){
		return seat_ScheduledService.getAll();
	}
}
