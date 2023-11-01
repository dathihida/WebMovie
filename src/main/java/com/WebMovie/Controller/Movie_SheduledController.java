package com.WebMovie.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.WebMovie.Entity.Movie_Scheduled;
import com.WebMovie.Service.Movie_ScheduledService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class Movie_SheduledController {
	@Autowired 
	Movie_ScheduledService movie_ScheduledService;
	
	/*
	 * @GetMapping("/movie_sheduled/{id}") public List<Movie_Scheduled>
	 * moviedetail(@PathVariable("id") Integer id, Model model, HttpServletRequest
	 * httpServletRequest) { model.addAttribute("movie_sheduled1",
	 * movie_ScheduledService.listMovieSheduledById(id)); return }
	 */
}
