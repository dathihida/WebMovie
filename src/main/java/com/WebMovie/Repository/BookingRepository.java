package com.WebMovie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WebMovie.Entity.Booking;


public interface BookingRepository extends JpaRepository<Booking, Integer>{

}
