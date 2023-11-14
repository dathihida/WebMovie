package com.WebMovie.ImplService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Repository.CustomerRepository;
import com.WebMovie.Service.ICustomerService;
import com.WebMovie.Service.MailService;
import com.WebMovie.WebSecurityConfig.UserInfoDetails;

@Service
public class CustomerService implements ICustomerService{

	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	MailService mailService;
	
	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		customer.setEXIST(true);
		customer.setROLE("ROLE_ADMIN");
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		
		mailService.sendMailCreateCustomer(customer);
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
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		mailService.sendMailUpdateCustomer(customer);
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

	@Override
	public String getLoggedInUserId() {
		// TODO Auto-generated method stub
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
	        UserInfoDetails use = (UserInfoDetails) authentication.getPrincipal();
	        Integer idUser = use.getId();
	        return String.valueOf(idUser);
        }
        return null;
	}

	@Override
	public Customer findByEmail(String email) {
		// TODO Auto-generated method stub
		return customerRepository.findByEMAIL(email).get();
	}

	@Override
	public Customer findCustomerByEmail(String email) {
		return customerRepository.findCustomerByEmail1(email);
	}

	@Override
	public Customer updatePassowrd(Customer customer) {
		// TODO Auto-generated method stub
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerRepository.save(customer);
	}

	@Override
	public void updatePassword(String password, Integer id) {
		customerRepository.updatePassword(password, id);
		
	}
}
