package com.WebMovie.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="SEAT")
public class Seat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	
	@ManyToOne
	@JoinColumn(name = "ID_ROOM")
	private Room ID_ROOM;
	
//	@ManyToOne
//	@JoinColumn(name= "ID_CUSTOMER")
//	private Customer ID_CUSTOMER;
	
	@JsonIgnore
	@OneToMany(mappedBy = "ID_SEAT")
	private List<Seat_Scheduled> LIST_SEAT_SCHEDULED;

//	@ElementCollection
//	private List<String> SEAT_NAME;
}
