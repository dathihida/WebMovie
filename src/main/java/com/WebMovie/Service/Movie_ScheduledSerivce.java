package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Movie_Scheduled;


public interface Movie_ScheduledSerivce {
	Movie_Scheduled addMovie_Scheduled(Movie_Scheduled movie_Scheduled);
	List<Movie_Scheduled> getAlls();
	Movie_Scheduled updateMovie_Scheduled(Movie_Scheduled movie_Scheduled, Integer id);
	Movie_Scheduled getMovie_ScheduledById(Integer id);
	void deleteMovie_Scheduled(Integer id);
}
