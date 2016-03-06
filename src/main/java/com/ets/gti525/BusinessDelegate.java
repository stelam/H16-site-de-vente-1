package com.ets.gti525;

import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.dao.impl.ShowDAOStub;
import com.ets.gti525.dao.impl.ShowPresentationDAOStub;
import com.ets.gti525.dao.impl.TheaterDAOStub;
import com.ets.gti525.dao.impl.TicketDAOStub;

public class BusinessDelegate {

    public static ShowDAO getShowDAO() {
        return new ShowDAOStub();
    }

    public static TheaterDAO getTheaterDAO() {
        return new TheaterDAOStub();
    }

    public static TicketDAO getTicketDAO() {
        return new TicketDAOStub();
    }

    public static ShowPresentationDAO getShowPresentationDAO() {
        return new ShowPresentationDAOStub();
    }

}
