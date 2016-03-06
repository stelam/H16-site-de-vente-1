package com.ets.gti525.dao.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.Ticket;

import java.util.ArrayList;
import java.util.List;

public class TicketDAOStub implements TicketDAO {

    @Override
    public Ticket addTicket(Ticket ticket) {
        ticket.setId(DataManager.getListOfTicket().size());
        DataManager.getListOfTicket().add(ticket);
        return ticket;
    }

    @Override
    public List<Ticket> getTicketsByShowPresentationId(int showPresentationId) {
        List<Ticket> ticketList = new ArrayList<>();
        for (Ticket ticket : DataManager.getListOfTicket()) {
            if (ticket.getShowPresentationId() == showPresentationId) {
                ticketList.add(ticket);
            }
        }
        return ticketList;
    }
}
