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

    @Autowired
    TicketDAO ticketDAO;

    @Override
    public ShoppingCart addTicket(@RequestBody List<Ticket> ticketList, HttpServletRequest request) {
        ShoppingCart shoppingCart = new ShoppingCart();
        for (Ticket ticket : ticketList) {
            Calendar cal = Calendar.getInstance();
            String uniqueID = UUID.randomUUID().toString();
            ticket.setTicketId(uniqueID);
            ticket.setTimeinmillis(cal.getTimeInMillis());
            DataManager.ticketsInReservationList.put(ticket.getTicketId(), ticket);
            shoppingCart.getTicketList().add(ticket);
        }
        request.getSession().setAttribute("cart", shoppingCart);
        request.getSession().setMaxInactiveInterval(300);
        return shoppingCart;
    }

    @Override
    public ShoppingCart getTicketsInCart(HttpServletRequest request) {
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession().getAttribute("cart");
        List<Ticket> ticketsToRemove = new ArrayList<>();
        for (Ticket ticket : shoppingCart.getTicketList()) {
            Calendar cal = Calendar.getInstance();
            if (cal.getTimeInMillis() - ticket.getTimeinmillis() > TimeUnit.MINUTES.toMillis(3)) {
                ticketsToRemove.add(ticket);
            }
        }
        shoppingCart.getTicketList().removeAll(ticketsToRemove);
        request.getSession().setAttribute("cart", shoppingCart);
        return shoppingCart;
    }
}
