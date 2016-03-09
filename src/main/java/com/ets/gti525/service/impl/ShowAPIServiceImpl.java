package com.ets.gti525.service.impl;



import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.service.ShowAPIService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Controller
public class ShowAPIServiceImpl implements ShowAPIService {

    @Autowired
    private ShowDAO showDAO;

    @Autowired
    private TicketDAO ticketDAO;

    @Autowired
    private ShowPresentationDAO showPresentationDAO;

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
    public void removeShow(@RequestParam Long id) {
        showDAO.delete(id);
    }

    @Override
    public Show editShow(@RequestBody Show show) {
        return showDAO.save(show);
    }

    @Override
    public boolean isShowAvailable(@RequestParam Long presentationShowId) {
        ShowPresentation showPresentation = showPresentationDAO.findOne(presentationShowId);
        List<Ticket> ticketList = ticketDAO.findByShowPresentationId(presentationShowId);
        int numberOfTicketSold = 0;
        for (Ticket ticket : ticketList) {
            if (ticket.getShowPresentationId() == (showPresentation.getId())) {
                numberOfTicketSold++;
            }
        }

        return numberOfTicketSold < showPresentation.getNumberOfPlaces();
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

    private List<ShowPresentation> getShowPresentationInDate(List<ShowPresentation> showPresentationList, long timeinmillisStart) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(timeinmillisStart);
        cal.add(Calendar.DAY_OF_WEEK, 1);
        long timeinmillisEnd = cal.getTimeInMillis();

        List<ShowPresentation> filteredShowPresentationList = new ArrayList<>();
        for (ShowPresentation showPresentation : showPresentationList) {
            if (showPresentation.getTimeinmillis() >= timeinmillisStart && showPresentation.getTimeinmillis() <= timeinmillisEnd) {
                filteredShowPresentationList.add(showPresentation);
            }
        }

        return filteredShowPresentationList;
    }
}
