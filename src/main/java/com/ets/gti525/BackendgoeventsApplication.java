package com.ets.gti525;

import com.ets.gti525.filter.AuthenticationAdminFilter;
import com.ets.gti525.filter.AuthenticationTheaterAdminFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.embedded.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.Filter;

@SpringBootApplication
public class BackendgoeventsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendgoeventsApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
			}
		};
	}

	@Bean
	public ServletListenerRegistrationBean<SessionListener> sessionListener() {
		return new ServletListenerRegistrationBean<>(new SessionListener());
	}

	@Bean
	public FilterRegistrationBean theaterAdminFilterRegistration() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(theaterAdminFilter());
		registration.addUrlPatterns("/theater/add");
		registration.addUrlPatterns("/show/add");
		registration.addUrlPatterns("/show/showPresentationDetails");
		registration.addUrlPatterns("/ticket/ticketsSold");
		registration.setName("theaterAdminFilter");
		return registration;
	}

	@Bean
	public FilterRegistrationBean adminFilterRegistration() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(adminFilter());
		registration.addUrlPatterns("/theater/remove");
		registration.addUrlPatterns("/theater/edit");
		registration.addUrlPatterns("/show/remove");
		registration.addUrlPatterns("/show/edit");
		registration.setName("adminFilter");
		return registration;
	}

	@Bean(name = "adminFilter")
	public Filter adminFilter() {
		return new AuthenticationAdminFilter();
	}

	@Bean(name ="theaterAdminFilter")
	public Filter theaterAdminFilter() {
		return new AuthenticationTheaterAdminFilter();
	}
}
