package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "BOOKING")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	
	@ManyToOne
	@JoinColumn(name = "ID_CUSTOMER")
	private Customer ID_CUSTOMER;
	
	@ManyToOne
	@JoinColumn(name ="ID_MOVIE_SCHEDULED")
	private Movie_Scheduled ID_MOVIE_SCHEDULED;
	
	private String MOVIE_NAME;
	
	private Double PRICE;
	
	private Date DATE;
	
	private Date DATE_SHOW;
	
	private String TIME_SHOW;
	
	private String STATUS;
	
	/*
	 * @ElementCollection private List<String> NAME_SEAT;
	 */
}
