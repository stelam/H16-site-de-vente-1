package com.ets.gti525.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    private String ticketId;
    private Long showPresentationId;
    private Long timeinmillis;
    private Long expiringTimeinmillis;
    private int inactivityExpirationDelay;
    private int quantity;


	public Ticket() {

   }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShowPresentationId() {
        return showPresentationId;
    }

    public void setShowPresentationId(Long showPresentationId) {
        this.showPresentationId = showPresentationId;
    }

    public Long getTimeinmillis() {
        return timeinmillis;
    }

    public void setTimeinmillis(Long timeinmillis) {
        this.timeinmillis = timeinmillis;
    }
    
    public Long getExpiringTimeinmillis() {
        return expiringTimeinmillis;
    }

    public void setExpiringTimeinmillis(Long timeinmillis) {
        this.expiringTimeinmillis = timeinmillis;
    }
    
    public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getInactivityExpirationDelay() {
		return inactivityExpirationDelay;
	}
	
	public void setInactivityExpirationDelay(int inactivityExpirationDelay) {
		this.inactivityExpirationDelay = inactivityExpirationDelay;
	}

}
