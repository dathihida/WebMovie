package com.WebMovie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WebMovie.Entity.Seat;


public interface SeatRepository extends JpaRepository<Seat, Integer>{

}
