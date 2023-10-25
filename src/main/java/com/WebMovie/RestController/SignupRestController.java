package com.WebMovie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Service.ICustomerService;

@RestController
@CrossOrigin
@RequestMapping("/add")
public class SignupRestController {
	@Autowired
	ICustomerService customerService;
	
//	@Autowired
//	private PasswordEncoder bCryptPasswordEncoder;
	
	@GetMapping()
	String sdd(){
		return "ko nhe";
	}
	@PostMapping("/userNoExist")
	public Customer addCustomerNoExist(@RequestBody Customer customer) {
//		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerService.addCustomer(customer);
	}
}
