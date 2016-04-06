package com.ets.gti525.model;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


public class CreditCard {

    String number;
    String first_name;
    String last_name;
    int cvv;
    String expiration_month;
    String expiration_year;
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public int getCvv() {
		return cvv;
	}
	public void setCvv(int cvv) {
		this.cvv = cvv;
	}
	public String getExpiration_month() {
		return expiration_month;
	}
	public void setExpiration_month(String expiration_month) {
		this.expiration_month = expiration_month;
	}
	public String getExpiration_year() {
		return expiration_year;
	}
	public void setExpiration_year(String expiration_year) {
		this.expiration_year = expiration_year;
	}
    
    
}
