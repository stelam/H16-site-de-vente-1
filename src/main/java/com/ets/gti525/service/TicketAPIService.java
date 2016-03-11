package com.ets.gti525.service;

import com.ets.gti525.model.Order;
import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Ticket;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/ticket")
public interface TicketAPIService {

    @RequestMapping(value = "/reserve", method = RequestMethod.POST)
    ShoppingCart addTicket(@RequestBody Ticket ticket, HttpServletRequest request);

    @RequestMapping(value = "/inCart", method = RequestMethod.GET)
    ShoppingCart getTicketsInCart(HttpServletRequest request);

    @RequestMapping(value = "/order", method = RequestMethod.POST)
    String saveOrder(@RequestBody Order order);
}
