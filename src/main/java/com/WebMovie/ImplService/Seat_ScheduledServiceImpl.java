package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Seat_Scheduled;
import com.WebMovie.Repository.Seat_ScheduledRepository;
import com.WebMovie.Service.Seat_ScheduledService;

@Service
public class Seat_ScheduledServiceImpl implements Seat_ScheduledService{

	@Autowired
	Seat_ScheduledRepository seat_ScheduledRepository;
	
	@Override
	public List<Seat_Scheduled> getAll() {
		// TODO Auto-generated method stub
		return seat_ScheduledRepository.findAll();
	}

}
