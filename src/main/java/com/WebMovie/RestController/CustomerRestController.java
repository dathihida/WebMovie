package com.WebMovie.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Service.ICustomerService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class CustomerRestController {
	@Autowired
	ICustomerService customerService;
	
	@GetMapping("/user1")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	String tesst() {
		return "hell user";
	}
	
	@GetMapping()
	String tesst1() {
		return "hell WORL";
	}
	
	@GetMapping("/admin")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	String tesst2() {
		return "hell ADMIN";
	}
	
	@GetMapping("/user")
	public List<Customer> listAll(){
		return customerService.getAlls();
	}
	
	@PostMapping("/user")
	public Customer addCustomer(@RequestBody Customer customer) {
		return customerService.addCustomer(customer);
	}
	
	@GetMapping("/{name}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Optional<Customer> findByName(@PathVariable String name) {
		return customerService.findCustomerByNAME(name);
	}
	
	@PutMapping("/{id}")
	public Customer updateCustomer(@RequestBody Customer customer, @PathVariable Integer id) {
		return customerService.updateCustomer(customer, id);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteCustomer(@PathVariable Integer id) {
		customerService.deleteCustomer(id);
	}
}
