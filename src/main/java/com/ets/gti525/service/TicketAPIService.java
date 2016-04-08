package com.ets.gti525.service;

import com.ets.gti525.model.ShoppingCart;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.model.TicketOrder;
import com.ets.gti525.model.TicketTO;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/ticket")
public interface TicketAPIService {

    @RequestMapping(value = "/reserve", method = RequestMethod.POST)
    ShoppingCart addTicket(@RequestBody Ticket ticket, HttpServletRequest request);

    @RequestMapping(value = "/inCart", method = RequestMethod.GET)
    ShoppingCart getTicketsInCart(HttpServletRequest request);

    @RequestMapping(value = "/order", method = RequestMethod.POST)
    TicketOrder saveOrder(@RequestBody TicketOrder order, HttpServletRequest request);

    @RequestMapping(value = "/ticketsSold", method = RequestMethod.GET)
    List<TicketTO> ticketsSoldThenDeactivate(@RequestParam("showPresentationId") Long showPresentationId);
    
    @RequestMapping(value = "/ticketsSoldKeepActive", method = RequestMethod.GET)
    List<TicketTO> ticketsSold(@RequestParam("showPresentationId") Long showPresentationId);
    
}
