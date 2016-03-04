package com.ets.gti525;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendgoeventsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendgoeventsApplication.class, args);
		DataManager.initializeData();
	}
}
