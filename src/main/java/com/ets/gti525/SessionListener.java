package com.ets.gti525;

import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Ticket;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Component
public class SessionListener implements HttpSessionListener {

    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        ShoppingCart shoppingCart = (ShoppingCart) httpSessionEvent.getSession().getAttribute("cart");
        for (Ticket ticket : shoppingCart.getTicketList()) {
            DataManager.ticketsInReservationList.remove(ticket.getTicketId());
        }
    }
}
