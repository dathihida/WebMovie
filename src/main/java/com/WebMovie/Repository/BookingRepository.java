package com.WebMovie.Repository;

import java.sql.SQLPermission;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.object.SqlQuery;
import org.springframework.transaction.annotation.Transactional;

import com.WebMovie.Entity.Booking;
import com.WebMovie.Entity.Seat_Scheduled;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


public interface BookingRepository extends JpaRepository<Booking, Integer>{
	@Query("select b from Booking b, Movie_Scheduled ms, "
			+ "Room r where b.ID_MOVIE_SCHEDULED = ms.ID and b.STATUS = 'TRUE' and ms.ID_ROOM = r.ID and r.ID = ?1")
	List<Booking> listBookingByIdRoom(Integer id);
	
//	@Transactional
//    @Modifying
//    @Query("UPDATE Booking SET STATUS = 'false' FROM Booking b INNER JOIN Movie_Scheduled ms ON b.ID_MOVIE_SCHEDULED = ms.ID WHERE ms.DATE < GETDATE();")
//	void updateListBooking();
//	@PersistenceContext
//    private EntityManager entityManager;
//	
//	 @Transactional
//	 public void updateEntities() {
//	 String jpql = "UPDATE Booking b " +
//             "SET b.STATUS = 'false' " +
//             "WHERE b.ID_MOVIE_SCHEDULED = (SELECT ms.ID FROM Movie_Scheduled ms WHERE ms.DATE < GETDATE())";
//	 	entityManager.createQuery(jpql).executeUpdate();
//	 }
}
