package com.WebMovie.Service;

import java.util.List;
import java.util.Optional;

import com.WebMovie.Entity.Customer;

public interface ICustomerService {
	Customer addCustomer(Customer customer);
	List<Customer> getAlls();
	Customer updateCustomer(Customer customer, Integer id);
	Customer getCustomerGetById(Integer id);
	Customer login(String email, String password);
	void deleteCustomer(Integer id);
	
	Optional<Customer> findCustomerByNAME(String name);
	Optional<Customer> findCustomerByEMAIL(String EAMIL);
	
	String getLoggedInUserId();
}
