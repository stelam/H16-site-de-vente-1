package com.ets.gti525.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.json.simple.JSONObject;


public class PaymentPreauthorization {

    @Id
    @GeneratedValue
    private String id;
    private String label;
    private String amount;
    private String status;
    private String expired_at;

    public PaymentPreauthorization(JSONObject jsonObject) {
    	this.id = (String) jsonObject.get("id");
    	this.label = (String) jsonObject.get("label");
    	this.amount = (String) jsonObject.get("amount");
    	this.status = (String) jsonObject.get("status");
    	this.expired_at = (String) jsonObject.get("expired_at");
    	
    	System.out.println(this.id);
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getExpired_at() {
		return expired_at;
	}

	public void setExpired_at(String expired_at) {
		this.expired_at = expired_at;
	}

}
