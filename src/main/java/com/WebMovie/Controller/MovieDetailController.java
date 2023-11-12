package com.WebMovie.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WebMovie.Entity.Movie;
import com.WebMovie.ImplService.MovieServiceImpl;
import com.WebMovie.Service.Movie_ScheduledService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class MovieDetailController {
	
	@Autowired
	MovieServiceImpl impl;
	
	@RequestMapping("/movie/{id}")
	public String moviedetail(@PathVariable("id") Integer id, Model model, HttpServletRequest httpServletRequest) {
		model.addAttribute("movie1", impl.getMovieById(id));
		return "movie_detail";
	}
}
