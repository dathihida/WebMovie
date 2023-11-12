package com.WebMovie.WebSecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean /**AUTHORIZATION*/
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/","/home","/home/**", "/login",
                		"/signup", "/js/**", "/css/**", "/images/**", 
                		"/add","/add/userNoExist",
                		"/api/movie/all", "/movie/**", "/v1/movie/**",
                		"/page/**", "/api/cinema/all",
                		"/api/room/all",
                		"/api/movie_scheduled/all", "/listMovieSheduled/**", 
                		"/api/movie_scheduled/detail/**", "/api/movie_scheduled/date/**",
                		"/api/seat_scheduled/**", "/api/seat_scheduled","/api/movie_scheduled/**",
                		"/api/seat/**",
                		"/booking/**", "/api/booking/**", "/api/booking", "/api/booking/update/**",
                		"/checkout/**",
                		"/pay", "/pay/**", "/api/pay","/api/pay/**","/historyBooking/**").permitAll()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/**", "/rest/**").authenticated()
                .and().formLogin()
                .loginPage("/login").loginProcessingUrl("/login").defaultSuccessUrl("/home")
                .and().build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserInfoUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }
}
