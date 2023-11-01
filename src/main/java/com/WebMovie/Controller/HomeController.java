package com.WebMovie.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	
<<<<<<< HEAD
	@GetMapping("/home/movie_scheduled")
	String movie_scheduled() {
		return "movie_scheduled";
	}
	
	
=======
	@GetMapping("/home/checkout")
	String checkout() {
		return "checkout";
	}

>>>>>>> aa463904ad8472e77311c51ee7425cc66848ae4a
}
