package com.ets.gti525;

import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.impl.ShowDAOImpl;
import com.ets.gti525.dao.impl.ShowDAOStub;

/**
 * Created by handal on 3/3/16.
 */
public class BusinessDelegate {

    public static ShowDAO getShowDAO() {
        return new ShowDAOStub();
    }

}
