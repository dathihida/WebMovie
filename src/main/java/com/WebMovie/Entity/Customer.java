package com.WebMovie.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "CUSTOMER")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	private String FULLNAME;
	private String PASSWORD;
	private String EMAIL;
	private String PHONENUMBER;
	private String ROLE;
	private Boolean EXIST;
	
	@JsonIgnore
	@OneToMany(mappedBy = "ID_CUSTOMER")
	private List<Booking> LIST_BOOKING;
	
	@JsonIgnore
	@OneToMany(mappedBy = "ID_CUSTOMER")
	private List<Pay> LIST_PAY;
}
