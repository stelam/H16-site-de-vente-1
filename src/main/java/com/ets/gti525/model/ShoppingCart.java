package com.ets.gti525.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

public class ShoppingCart {

    @Id
    @GeneratedValue
    private int id;

    private List<Ticket> ticketList;


    public ShoppingCart() {
        ticketList = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Ticket> getTicketList() {
        return ticketList;
    }

    public void setTicketList(List<Ticket> ticketList) {
        this.ticketList = ticketList;
    }

	public Ticket getTicketInCartByTicketId(String ticketId) {
		for (Ticket ticket : ticketList) {
			if (ticket.getTicketId().equals(ticketId)) {
				return ticket;
			}
		}
		return null;
	}
    
    public void addOrReplaceTicket(Ticket ticket) {
    	Boolean replaced = false;
    	int i = 0;
    	for (Ticket t : ticketList) {
    		if (t.getTicketId().equals(ticket.getTicketId())) {
    			ticketList.set(i, ticket);
    			replaced = true;
    		}
    		i++;
    	}   		
    	
    	if (!replaced) {
    		ticketList.add(ticket);
    	}
    }

	public void removeExpiredTickets() {
        Calendar cal = Calendar.getInstance();
        long timeinmillis = cal.getTimeInMillis();
        
		for (Iterator<Ticket> iter = ticketList.listIterator(); iter.hasNext(); ) {
		    Ticket t = iter.next();
		    if (t.getExpiringTimeinmillis() <= timeinmillis) {
		        iter.remove();
		    }
		} 	
		
	}
}
