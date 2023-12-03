package com.WebMovie.Controller;

import java.io.IOException;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class HomeController {

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private RedirectStrategy redirectStrategy;

	@RequestMapping("/signin")
	String login(HttpServletRequest request) {
		String referrer = request.getHeader("Referer");
		request.getSession().setAttribute("prevPage", referrer);
		System.out.println(referrer);
		return "signin";
	}

	@GetMapping("/login-success")
	public void loginSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String prevPage = (String) request.getSession().getAttribute("prevPage");
		System.out.println("prevPage" + prevPage);
		if (prevPage != null && !prevPage.contains("/login")) {
			redirectStrategy.sendRedirect(request, response, prevPage);
		} else {
			redirectStrategy.sendRedirect(request, response, "/home");
		}
	}

	@GetMapping("/home")
	String home() {
		return "home";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/admin")
	String admin() {
		return "admin";
	}

	@RequestMapping("/signup")
	String signup() {
		return "signup";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/customer")
	String customer() {
		return "customer";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/movie")
	String movie() {
		return "movie";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/cinema")
	String cinema() {
		return "cinema";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/room")
	String room() {
		return "room";
	}

	@GetMapping("/home/day")
	String day() {
		return "detail_booking";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/movie_scheduled")
	String movie_scheduled() {
		return "movie_scheduled";
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/voucher")
	String voucher() {
		return "voucher";
	}
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/home/bill")
	String bill() {
		return "bill";
	}

	@GetMapping("/checkout/{idBooking}")
	String checkout(@PathVariable("idBooking") Integer idBooking) {
		return "checkout";
	}

	@GetMapping("/home/seat")
	String seat() {
		return "seat";
	}
	
	@GetMapping("/home/nowshowing")
	String nowshowing() {
		return "nowshowing";
	}

	@GetMapping("/home/comingsoon")
	String comingsoon() {
		return "comingsoon";
	}
	
	@GetMapping("/home/about-us")
	String aboutus() {
		return "infopage/about_us";
	}
	
	@GetMapping("/home/payment-policy")
	String paymentpolicy() {
		return "infopage/payment_policy";
	}
	
	@GetMapping("/home/privacy-policy")
	String privacypolicy() {
		return "infopage/privacy_policy";
	}
	
	@GetMapping("/home/terms-conditions")
	String termsconditions() {
		return "infopage/terms_conditions";
	}
	
	@GetMapping("/home/terms-use")
	String termsuse() {
		return "infopage/terms_use";
	}
	
	@GetMapping("/home/connect")
	String connect() {
		return "infopage/connect";
	}
	
	@GetMapping("/home/showtime")
	String showtime() {
		return "showtime";
	}
	
	@GetMapping("/home/question")
	String question() {
		return "infopage/question";
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

	@GetMapping("/error/404")
	public String pageUrl404() {
		return "error404";
	}

	// @GetMapping("/comment")
	// public String comment() {
	// return "movie_detail";
	// }
}
