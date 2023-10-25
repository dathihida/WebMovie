package com.WebMovie.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	Optional<Customer> findByEMAIL(String eMAIL);
	
	@Query(value = "select * from customer where FULLNAME = ?1", nativeQuery = true)
    Optional<Customer> findCustomerByNAME(String name);
	
	@Query(value = "select * from customer where EMAIL = ?1", nativeQuery = true)
    Optional<Customer> findCustomerByEMAIL(String EAMIL);
}
