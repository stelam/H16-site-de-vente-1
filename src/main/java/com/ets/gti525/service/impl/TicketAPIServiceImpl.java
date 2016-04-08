package com.ets.gti525.service.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.OrderDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.model.TicketOrder;
import com.ets.gti525.model.TicketTO;
import com.ets.gti525.service.TicketAPIService;
import com.google.common.collect.Lists;

import org.dom4j.IllegalAddException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

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

    @Autowired
    OrderDAO orderDAO;
    
    @Autowired
    ShowDAO showDAO;

    @Autowired
    DataManager dataManager;

    @Override
    public ShoppingCart addTicket(@RequestBody Ticket ticket, HttpServletRequest request) {
        //ShoppingCart shoppingCart = new ShoppingCart();
        Calendar cal = Calendar.getInstance();
        long timeinmillis = cal.getTimeInMillis();
        long expiringTimeinmillis = cal.getTimeInMillis() + dataManager.getCartReservationMinutes() * 60 * 1000;
        
        String uniqueID = UUID.randomUUID().toString();
        
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession(true).getAttribute("cart");
        System.out.println(request.getSession(true));
        
        if (shoppingCart == null) {
        	shoppingCart = new ShoppingCart();
        }
        
        shoppingCart.removeExpiredTickets();

        if (shoppingCart.getTicketList().size() >= 6) {
            throw new IllegalAddException("Can't add ticket in cart. Cart is full");
        }
    
    	Ticket existingSameTicket = shoppingCart.getTicketInCartByShowPresentationId(ticket.getShowPresentationId());
    	System.out.println("SHOW PRES ID" + ticket.getShowPresentationId());
    	
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
        ticket.setInactivityExpirationDelay(dataManager.getInactivityExpirationMinutes());
        
        DataManager.ticketsInReservationList.put(ticket.getTicketId(), ticket);
        shoppingCart.addOrReplaceTicket(ticket);
        System.out.println(ticket.getTicketId());
        System.out.println("QTY:"+DataManager.ticketsInReservationList.get(ticket.getTicketId()).getQuantity());
        
        request.getSession(true).setAttribute("cart", shoppingCart);
        
        request.getSession().setMaxInactiveInterval(dataManager.getInactivityExpirationMinutes() * 60);
        return shoppingCart;
    }

    @Override
    public ShoppingCart getTicketsInCart(HttpServletRequest request) {
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession().getAttribute("cart");
        List<Ticket> ticketsToRemove = new ArrayList<>();

        for (Ticket ticket : shoppingCart.getTicketList()) {
            Calendar cal = Calendar.getInstance();
            if (cal.getTimeInMillis() - ticket.getTimeinmillis() > TimeUnit.MINUTES.toMillis(dataManager.getCartReservationMinutes())) {
                ticketsToRemove.add(ticket);
            }
        }

        shoppingCart.getTicketList().removeAll(ticketsToRemove);
        request.getSession().setAttribute("cart", shoppingCart);
        return shoppingCart;
    }

    @Override
    public TicketOrder saveOrder(@RequestBody TicketOrder order, HttpServletRequest request) {
        String confirmationNumber = UUID.randomUUID().toString();
        order.setConfirmationId(confirmationNumber);
        
        
        // create individual tickets
        TicketOrder orderToSave = new TicketOrder(order);
        orderToSave.setConfirmationId(confirmationNumber);
        List<Ticket> orderToSaveTicketList = new ArrayList<Ticket>();
        for (Ticket ticket : order.getTicketBoughtList()) {
        	for (int i = 0; i<ticket.getQuantity(); i++){
        		String individualTicketId = UUID.randomUUID().toString();
        		System.out.println(individualTicketId);
        		Ticket individualTicket = new Ticket(ticket, individualTicketId);
        		orderToSaveTicketList.add(individualTicket);
        	}
        }
        orderToSave.setTicketBoughtList(orderToSaveTicketList);
        
        orderDAO.save(orderToSave);
        
        request.getSession().setAttribute("cart", null);

        return orderToSave;
    }
    


    @Override
    public List<TicketTO> ticketsSold(@RequestParam("showPresentationId") Long showPresentationId) {
        if (showPresentationId == null) {
            throw new IllegalArgumentException("Bad parameter");
        }
        
        List<Ticket> ticketList = ticketDAO.findByShowPresentationId(showPresentationId);
        List<TicketTO> ticketTOList = new ArrayList<>();
        
        for (Ticket ticket : ticketList){
        	TicketTO ticketTO = new TicketTO(ticket);
        	ticketTOList.add(ticketTO);
        }
        
        return ticketTOList;
    }
    
    @Override
    public List<TicketTO> ticketsSoldThenDeactivate(@RequestParam("showPresentationId") Long showPresentationId) {
        if (showPresentationId == null) {
            throw new IllegalArgumentException("Bad parameter");
        }
        
        List<Ticket> ticketList = ticketDAO.findByShowPresentationId(showPresentationId);
        List<TicketTO> ticketTOList = new ArrayList<>();
        
        for (Ticket ticket : ticketList){
        	TicketTO ticketTO = new TicketTO(ticket);
        	ticketTOList.add(ticketTO);
        }
        
        Show show = this.getShowByShowPresentationId(showPresentationId);
        if (show != null){
        	show.setActive(false);
        	showDAO.save(show);
        }
        
        return ticketTOList;
    }
    
    protected Show getShowByShowPresentationId(Long showPresentationId){

        List<Show> showList = Lists.newArrayList(showDAO.findAll());

        for (Show show : showList) {
            if (show.getShowPresentationList() != null) {
            	for (ShowPresentation sp : show.getShowPresentationList()) {
            		if (sp.getId() == showPresentationId) {
            			return show;
            		}
            	}
            }
        }
        
        return null;
    }
}
