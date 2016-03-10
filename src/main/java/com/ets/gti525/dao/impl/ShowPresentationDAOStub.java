package com.ets.gti525.dao.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.model.ShowPresentation;


public class ShowPresentationDAOStub implements ShowPresentationDAO {

    @Override
    public ShowPresentation findShowPresentationById(int id) {
        for (ShowPresentation showPresentation : DataManager.getListOfShowPresentation()) {
            if (showPresentation.getId() == id) {
                return showPresentation;
            }
        }

        return null;
    }
}
