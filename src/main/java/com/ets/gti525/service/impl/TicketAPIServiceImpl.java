package com.ets.gti525.service.impl;

import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.service.TicketAPIService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class TicketAPIServiceImpl implements TicketAPIService {


    @Override
    public ShoppingCart addTicket(@RequestBody Ticket ticket, HttpServletRequest request) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.getTicketList().add(ticket);
        request.getSession().setAttribute("cart", shoppingCart);
        request.getSession().setMaxInactiveInterval(60);
        return shoppingCart;
    }

    @Override
    public ShoppingCart getTicketsInCart(HttpServletRequest request) {
        return (ShoppingCart) request.getSession().getAttribute("cart");
    }
}
