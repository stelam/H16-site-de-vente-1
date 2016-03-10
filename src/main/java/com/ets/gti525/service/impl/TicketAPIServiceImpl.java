package com.ets.gti525.service.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.service.TicketAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Controller
public class TicketAPIServiceImpl implements TicketAPIService {
	private static final int CART_RESERVATION_MINUTES = 1; // maybe put this in a config file/system
	private static final int INACTIVITY_EXPIRATION_MINUTES = 3; // maybe put this in a config file/system
	
    @Autowired
    TicketDAO ticketDAO;

    @Override
    public ShoppingCart addTicket(@RequestBody Ticket ticket, HttpServletRequest request) {
        //ShoppingCart shoppingCart = new ShoppingCart();
        Calendar cal = Calendar.getInstance();
        long timeinmillis = cal.getTimeInMillis();
        long expiringTimeinmillis = cal.getTimeInMillis() + CART_RESERVATION_MINUTES * 60 * 1000;
        
        String uniqueID = UUID.randomUUID().toString();
        
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession(true).getAttribute("cart");
        
        if (shoppingCart == null) {
        	shoppingCart = new ShoppingCart();
        }
        
        shoppingCart.removeExpiredTickets();
    
    	Ticket existingSameTicket = shoppingCart.getTicketInCartByShowPresentationId(ticket.getShowPresentationId());
    	
        // tickets with matching showPresentationId must have the same timer settings
        // otherwise, we create new timer settings for the first ticket of a kind
        if (existingSameTicket == null) {
        	ticket.setTimeinmillis(timeinmillis);
            ticket.setExpiringTimeinmillis(expiringTimeinmillis);
            ticket.setTicketId(uniqueID);
        } else {
        	ticket.setTimeinmillis(existingSameTicket.getTimeinmillis());
        	ticket.setExpiringTimeinmillis(existingSameTicket.getExpiringTimeinmillis());
        	ticket.setTicketId(existingSameTicket.getTicketId());
        }
        ticket.setInactivityExpirationDelay(INACTIVITY_EXPIRATION_MINUTES);
        
        DataManager.ticketsInReservationList.put(ticket.getTicketId(), ticket);
        shoppingCart.addOrReplaceTicket(ticket);
        
        request.getSession(true).setAttribute("cart", shoppingCart);
        
        request.getSession().setMaxInactiveInterval(INACTIVITY_EXPIRATION_MINUTES * 60);
        return shoppingCart;
    }

    @Override
    public ShoppingCart getTicketsInCart(HttpServletRequest request) {
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession().getAttribute("cart");
        List<Ticket> ticketsToRemove = new ArrayList<>();

        for (Ticket ticket : shoppingCart.getTicketList()) {
            Calendar cal = Calendar.getInstance();
            if (cal.getTimeInMillis() - ticket.getTimeinmillis() > TimeUnit.MINUTES.toMillis(CART_RESERVATION_MINUTES)) {
                ticketsToRemove.add(ticket);
            }
        }

        shoppingCart.getTicketList().removeAll(ticketsToRemove);
        request.getSession().setAttribute("cart", shoppingCart);
        return shoppingCart;
    }
    

}
