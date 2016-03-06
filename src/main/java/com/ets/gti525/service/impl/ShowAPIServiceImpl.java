package com.ets.gti525.service.impl;


import com.ets.gti525.BusinessDelegate;
import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.service.ShowAPIService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ShowAPIServiceImpl implements ShowAPIService {

    private ShowDAO showDAO;
    private TicketDAO ticketDAO;
    private ShowPresentationDAO showPresentationDAO;

    @Override
    public Show addShow(@RequestBody Show show) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.addShow(show);
    }

    @Override
    public Show getShowById(@RequestParam int id) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.findShowById(id);
    }

    @Override
    public Show getShowByName(@RequestParam String showName) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.findShowByName(showName);
    }

    @Override
    public List<Show> getShowsByArtist(@RequestParam String artistName) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.findShowsByArtist(artistName);
    }

    @Override
    public Show removeShow(@RequestParam int id) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.removeShow(id);
    }

    @Override
    public Show modifyShow(@RequestBody Show show) {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.editShow(show);
    }

    @Override
    public boolean isShowAvailable(@RequestParam int presentationShowId) {
        showPresentationDAO = BusinessDelegate.getShowPresentationDAO();
        ticketDAO = BusinessDelegate.getTicketDAO();

        ShowPresentation showPresentation = showPresentationDAO.findShowPresentationById(presentationShowId);
        List<Ticket> ticketList = ticketDAO.getTicketsByShowPresentationId(presentationShowId);
        int numberOfTicketSold = 0;
        for (Ticket ticket : ticketList) {
            if (ticket.getShowPresentationId() == showPresentation.getId()) {
                numberOfTicketSold++;
            }
        }

        return numberOfTicketSold < showPresentation.getNumberOfPlaces();
    }

    @Override
    public List<Show> getShowsList() {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.getShows();
    }

    @Override
    public List<Show> getFeaturedShow() {
        showDAO = BusinessDelegate.getShowDAO();
        return showDAO.getFeaturedShows();
    }
}
