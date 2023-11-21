package com.WebMovie.WebSecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;

import io.micrometer.core.ipc.http.HttpSender.Request;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean /** AUTHORIZATION */
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/", "/home", "/login", "/home/resetPassword","/login-success",
                        "/signup", "/js/**", "/css/**", "/images/**",
                        "/add", "/add/userNoExist",
                        "/api/movie/all", "/movie/**", "/v1/movie/**",
                        "/page/**", "/api/cinema/all",
                        "/api/room/all",
                        "/api/movie_scheduled/all", "/listMovieSheduled/**",
                        "/api/movie_scheduled/detail/**", "/api/movie_scheduled/date/**",
                        "/api/seat_scheduled/**", "/api/seat_scheduled", "/api/movie_scheduled/**",
                        "/api/seat/**",
                        "/api/booking/**", "/api/booking", "/api/booking/update/**",
                        "/pay", "/pay/**", "/api/pay", "/api/pay/**", "/mail/**",
                        "/api/resetPassword/**", "/changePassword/**", "/api/user/**", "/api/find/**", "/error/404")
                .permitAll()
                .requestMatchers("/booking/**", "/checkout/**", "/historyBooking/**").authenticated()
                .requestMatchers("/home/**").authenticated()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/**", "/rest/**").authenticated()
               .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login")
                // return page home
                .defaultSuccessUrl("/login-success", true)
                .permitAll()
                // logout in page home
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/home")
                .permitAll()
                 // url and page 404
                .and()
                .exceptionHandling().accessDeniedPage("/error/404")// duong dan
                .and().build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }
    
    @Bean
    public RedirectStrategy redirectStrategy() {
    	return new DefaultRedirectStrategy();
    }
}
