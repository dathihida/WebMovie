package com.WebMovie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Seat_Scheduled;

public interface Seat_ScheduledRepository extends JpaRepository<Seat_Scheduled, Integer>{

}
