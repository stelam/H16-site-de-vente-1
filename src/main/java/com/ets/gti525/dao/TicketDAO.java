package com.ets.gti525.dao;


import com.ets.gti525.model.Ticket;

import java.util.List;

public interface TicketDAO {

    Ticket addTicket(Ticket ticket);
    List<Ticket> getTicketsByShowPresentationId(int showPresentationId);

}
