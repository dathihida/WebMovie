package com.WebMovie.Controller;

import java.sql.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.persistence.criteria.CriteriaBuilder.In;

@Controller
public class HomeController {
	
	@RequestMapping("/login")
	String login() {
		return "signin";
	}
	
	@GetMapping("/home")
	String home() {
		return "home";
	}
	@GetMapping("/home/admin")
	String admin() {
		return "admin";
	}
	
	@RequestMapping("/signup")
	String signup() {
		return "signup";
	}
	
	@GetMapping("/home/customer")
	String customer() {
		return "customer";
	}
	
	@GetMapping("/home/movie")
	String movie() {
		return "movie";
	}
	
	@GetMapping("/home/cinema")
		String cinema() {
			return "cinema";
	}
	
	@GetMapping("/home/room")
	String room() {
		return "room";
	}
	
	@GetMapping("/home/day")
	String day() {
		return "detail_booking";
	}
	
	@GetMapping("/home/movie_scheduled")
	String movie_scheduled() {
		return "movie_scheduled";
	}
	
	@GetMapping("/home/checkout/{id}/{date}/{time}/{idMovieSh}")
	String checkout(@PathVariable("id") Integer id,
			   @PathVariable("date") Date date, 
			   @PathVariable("time") String time, 
			   @PathVariable("idMovieSh") Integer idMovieSh) {
		return "checkout";
	}

	@GetMapping("/home/seat")
	String seat() {
		return "seat";
	}
	
	@GetMapping("/booking/{id}/{date}/{time}/{idMovieSh}")
	String booking(@PathVariable("id") Integer id,
				   @PathVariable("date") Date date, 
				   @PathVariable("time") String time, 
				   @PathVariable("idMovieSh") Integer idMovieSh) {
		return "booking";
	}
}
