package com.WebMovie.ImplService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Repository.CustomerRepository;
import com.WebMovie.Service.ICustomerService;

@Service
public class CustomerService implements ICustomerService{

	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		customer.setEXIST(true);
		customer.setROLE("ROLE_ADMIN");
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerRepository.save(customer);
	}

	@Override
	public List<Customer> getAlls() {
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

	@Override
	public Customer updateCustomer(Customer customer, Integer id) {
		// TODO Auto-generated method stub
		customer.setEXIST(true);
		customer.setROLE("ROLE_USER");
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerRepository.save(customer);
	}

	@Override
	public Customer getCustomerGetById(Integer id) {
		// TODO Auto-generated method stub
		return customerRepository.findById(id).get();
	}

	@Override
	public Customer login(String email, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteCustomer(Integer id) {
		// TODO Auto-generated method stub
		customerRepository.deleteById(id);
	}

	@Override
	public Optional<Customer> findCustomerByNAME(String name) {
		// TODO Auto-generated method stub
		return customerRepository.findCustomerByNAME(name);
	}

	@Override
	public Optional<Customer> findCustomerByEMAIL(String EAMIL) {
		// TODO Auto-generated method stub
		return customerRepository.findCustomerByEMAIL(EAMIL);
	}

}
