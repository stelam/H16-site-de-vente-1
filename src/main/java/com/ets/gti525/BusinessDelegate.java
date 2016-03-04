package com.ets.gti525;

import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.dao.impl.ShowDAOImpl;
import com.ets.gti525.dao.impl.ShowDAOStub;
import com.ets.gti525.dao.impl.TheaterDAOStub;

public class BusinessDelegate {

    public static ShowDAO getShowDAO() {
        return new ShowDAOStub();
    }

    public static TheaterDAO getTheaterDAO() {
        return new TheaterDAOStub();
    }

}
