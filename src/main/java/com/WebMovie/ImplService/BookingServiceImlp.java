package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Booking;
import com.WebMovie.Repository.BookingRepository;
import com.WebMovie.Service.BookingService;

@Service
public class BookingServiceImlp implements BookingService{

	@Autowired
	BookingRepository bookingRepository;
	
	@Override
	public List<Booking> listBookingByIdRoom(Integer id) {
		// TODO Auto-generated method stub
		return bookingRepository.listBookingByIdRoom(id);
	}

	@Override
	public Booking addBooking(Booking booking) {
		// TODO Auto-generated method stub
		return bookingRepository.save(booking);
	}
	
}
