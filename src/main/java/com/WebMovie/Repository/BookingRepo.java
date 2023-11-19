package com.WebMovie.Repository;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class BookingRepo {
	@PersistenceContext
    private EntityManager entityManager;
	
//	@Transactional
//	public void updateEntities() {
//		String jpql = "UPDATE Movie_Scheduled b " +
//            "SET b.STATUS = 'false' " +
//            "WHERE b.ID_MOVIE_SCHEDULED IN (SELECT ms.ID FROM Movie_Scheduled ms WHERE ms.DATE < GETDATE())";
//	 	entityManager.createQuery(jpql).executeUpdate();
//	 }
	
	@Transactional
	public void updateStatusMovie_Scheduled() {
		String jpql = "UPDATE Movie_Scheduled b SET b.STATUS = false WHERE b.DATE < GETDATE()";
		entityManager.createQuery(jpql).executeUpdate();
	}
}
