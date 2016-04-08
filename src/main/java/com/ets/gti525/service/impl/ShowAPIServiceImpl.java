package com.ets.gti525.service.impl;


import com.ets.gti525.DataManager;
import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.*;
import com.ets.gti525.service.ShowAPIService;
import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

import java.util.*;

@Controller
public class ShowAPIServiceImpl implements ShowAPIService {

    @Autowired
    private ShowDAO showDAO;

    @Autowired
    private TicketDAO ticketDAO;

    @Autowired
    private ShowPresentationDAO showPresentationDAO;

    @Autowired
    private DataManager dataManager;

    @Override
    public Show addShow(@RequestBody Show show) {
        return showDAO.save(show);
    }

    @Override
    public Show getShowById(@RequestParam Long id) {
        return showDAO.findOne(id);
    }

    @Override
    public Show getShowByName(@RequestParam String showName) {
        return showDAO.findShowByName(showName);
    }

    @Override
    public List<Show> getShowsByArtist(@RequestParam String artistName) {
        return showDAO.findByArtistName(artistName);
    }
    
	@Override
	public List<Show> getShowsByTheater(@RequestParam Long theaterId) {
        List<Show> showList = Lists.newArrayList(showDAO.findAll());
        List<Show> filteredShowList = new ArrayList<>();
        for (Show show : showList) {
            if (show.getShowPresentationList() != null) {
            	for (ShowPresentation sp : show.getShowPresentationList()) {
            		if (sp.getTheater().getId() == theaterId) {
            			Show filteredShow = new Show(show);
            			filteredShowList.add(filteredShow);
            			break;
            		}
            	}
            }
        }
        return filteredShowList;
	}

    @Override
    public void removeShow(@RequestParam Long id) {
        showDAO.delete(id);
    }

    @Override
    public Show editShow(@RequestBody Show show) {
        return showDAO.save(show);
    }

    @Override
    public List<Show> searchByArtistOrByName(@RequestParam String query) {
        ArrayList<Show> searchResults = new ArrayList<Show>();

        List<Show> matchingShowsByName = showDAO.findByNameContainingIgnoreCase(query);
        searchResults.addAll(matchingShowsByName);

        List<Show> matchingShowsByArtistName = showDAO.findByArtistNameContainingIgnoreCase(query);
        searchResults.addAll(matchingShowsByArtistName);

        return searchResults;
    }

    @Override
    public boolean isShowAvailable(@RequestParam Long presentationShowId, @RequestParam Long quantity, HttpServletRequest request) {
        ShowPresentation showPresentation = showPresentationDAO.findOne(presentationShowId);
        int numberOfTicketSoldAndReserved = getBoughtTicketsForShow(showPresentation);
        dataManager.updateReservationList(presentationShowId);
        
        // check if show is still active first
        Show show = this.getShowByShowPresentationId(presentationShowId);
        if (show == null || show.isActive() == false) {
        	return false;
        }

        for (Map.Entry<String, Ticket> entry : DataManager.ticketsInReservationList.entrySet()) {
            if (Objects.equals(entry.getValue().getShowPresentationId(), presentationShowId)) {
                    numberOfTicketSoldAndReserved += entry.getValue().getQuantity();
            }
        }

        System.out.println(numberOfTicketSoldAndReserved);
        
        ShoppingCart shoppingCart = (ShoppingCart) request.getSession(true).getAttribute("cart");
        if (shoppingCart != null){
        	shoppingCart.removeExpiredTickets();

        
	    	Ticket existingSameTicket = shoppingCart.getTicketInCartByShowPresentationId(presentationShowId);
	        if (existingSameTicket != null) {
	        	quantity -= existingSameTicket.getQuantity();
	        }
        }
        
        return (numberOfTicketSoldAndReserved + quantity) <= showPresentation.getNumberOfPlaces();
    }

    @Override
    public boolean isShowClosed(@RequestParam Long presentationShowId) {
        ShowPresentation showPresentation = showPresentationDAO.findOne(presentationShowId);
        int numberOfticketSold = getBoughtTicketsForShow(showPresentation);

        return (numberOfticketSold >= showPresentation.getNumberOfPlaces());
    }

    @Override
    public List<Show> getShowsList() {
        return Lists.newArrayList(showDAO.findAll());
    }

    @Override
    public List<Show> getFeaturedShow() {
        return showDAO.findByIsFeaturedTrue();
    }

    @Override
    public List<Show> getShowsByDate(@RequestParam() long timeinmillis) {
        List<Show> showList = Lists.newArrayList(showDAO.findAll());
        List<Show> filteredShowList = new ArrayList<>();
        for (Show show : showList) {
            if (show.getShowPresentationList() != null) {
                List<ShowPresentation> showPresentationInDate = getShowPresentationInDate(show.getShowPresentationList(), timeinmillis);
                if (showPresentationInDate.size() > 0) {
                    //deep copy the object and set it's presentationlist as the new filtered one.
                    Show filteredShow = new Show(show);
                    filteredShow.setShowPresentationList(showPresentationInDate);
                    filteredShowList.add(filteredShow);
                }
            }
        }

        return filteredShowList;
    }

    @Override
    public ShowPresentationWrapper getShowPresentationDetails(@RequestParam Long presentationShowId) {
        ShowPresentation showPresentation = showPresentationDAO.findOne(presentationShowId);
        int numberOfTicketSold = getBoughtTicketsForShow(showPresentation);

        ShowPresentationWrapper showPresentationWrapper = new ShowPresentationWrapper();
        showPresentationWrapper.setShowPresentation(showPresentation);
        showPresentationWrapper.setNumberOfTicketsRemaining(showPresentation.getNumberOfPlaces() - numberOfTicketSold);
        return showPresentationWrapper;
    }

    private List<ShowPresentation> getShowPresentationInDate(List<ShowPresentation> showPresentationList, long timeinmillisStart) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(timeinmillisStart);
        cal.add(Calendar.DAY_OF_WEEK, 1);
        long timeinmillisEnd = cal.getTimeInMillis();

        List<ShowPresentation> filteredShowPresentationList = new ArrayList<>();
        for (ShowPresentation showPresentation : showPresentationList) {
        	// System.out.println(showPresentation.getTimeinmillis() + ">=" + timeinmillisStart + " && <= " + timeinmillisEnd);
            if (showPresentation.getTimeinmillis() >= timeinmillisStart && showPresentation.getTimeinmillis() < timeinmillisEnd) {
                filteredShowPresentationList.add(showPresentation);
            }
        }

        return filteredShowPresentationList;
    }

    private int getBoughtTicketsForShow(ShowPresentation showPresentation) {
        List<Ticket> ticketList = ticketDAO.findByShowPresentationId(showPresentation.getId());
        int numberOfTicketSold = 0;

        for (Ticket ticket : ticketList) {
            if (Objects.equals(ticket.getShowPresentationId(), showPresentation.getId())) {
                numberOfTicketSold += ticket.getQuantity();
            }
        }

        return numberOfTicketSold;
    }

    private Show getShowByShowPresentationId(Long showPresentationId){

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
