package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name="SEAT_SCHEDULED")
public class Seat_Scheduled {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	
	@ManyToOne
	@JoinColumn(name = "ID_SEAT")
	private Seat ID_SEAT;
	
	@ManyToOne
	@JoinColumn(name = "ID_MOVIE_SCHEDULED")
	private Movie_Scheduled ID_MOVIE_SCHEDULED;
	
	@Temporal(TemporalType.DATE)
	private Date DATE;
	
	private String TIME;
	
	private String STATUS;
}
