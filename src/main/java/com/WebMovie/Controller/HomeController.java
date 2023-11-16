package com.WebMovie.Controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;
	
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
	
	@GetMapping("/checkout/{idBooking}")
	String checkout(@PathVariable("idBooking") Integer idBooking) {
		return "checkout";
	}

	@GetMapping("/home/seat")
	String seat() {
		return "seat";
	}
	
	@GetMapping("/booking/{idMovieSh}")
	String booking(@PathVariable("idMovieSh") Integer idMovieSh) {
		return "booking";
	}
	
	@GetMapping("/historyBooking/{id}")
	String profile(@PathVariable("id") Integer id) {
		return "historyBooking";
	}
	
	@GetMapping("/home/resetPassword")
	String resetPassword() {
		return "resetPassword";
	}
	
	@GetMapping("/changePassword/{id}")
	String changePassword(@PathVariable("id") Integer id) {
		return "changePassword";
	}
}
