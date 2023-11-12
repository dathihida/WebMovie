package com.WebMovie.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Booking;

public interface BookingService {
	List<Booking> listBookingByIdRoom(Integer id);
	
	Booking addBooking(Booking booking);
	Booking getBookingById(Integer id);
	void updateStatusBooking(Integer id);
	void updateStatusBookingWithFailed(Integer id);
	
	List<Booking> getAllBookingByIdCustomer(Integer id);
}
