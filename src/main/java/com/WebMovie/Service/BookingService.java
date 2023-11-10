package com.WebMovie.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Booking;

public interface BookingService {
	List<Booking> listBookingByIdRoom(Integer id);
	
	Booking addBooking(Booking booking);
}
