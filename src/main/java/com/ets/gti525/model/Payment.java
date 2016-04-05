package com.ets.gti525.model;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


public class Payment {

    private double amount;
    private String label;
    private CreditCard credit_card;
    
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public CreditCard getCredit_card() {
		return credit_card;
	}
	public void setCredit_card(CreditCard credit_card) {
		this.credit_card = credit_card;
	}
    
}
