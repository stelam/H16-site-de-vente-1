package com.ets.gti525.dao.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.model.Show;

import java.util.List;
import java.util.stream.Collectors;

public class ShowDAOStub implements ShowDAO {

    @Override
    public Show addShow(Show show) {
        //Save show, return saved show with good id;
        int id = DataManager.generateRandomNumber(4, 1000);
        show.setId(id);
        DataManager.addShow(show);
        return show;
    }

    @Override
    public Show findShowByName(String name) {
        for (Show show : DataManager.getListOfShow()) {
            if (show.getName().equals(name)) {
                return show;
            }
        }
        return null;
    }

    @Override
    public Show findShowById(int id) {
        for (Show show : DataManager.getListOfShow()) {
            if (show.getId() == id) {
                return show;
            }
        }
        return null;
    }

    @Override
    public List<Show> findShowsByArtist(String name) {
        return DataManager.getListOfShow().stream().filter(show -> show.getArtistName().equals(name)).collect(Collectors.toList());
    }

    @Override
    public Show removeShow(int id) {
        for (Show show : DataManager.getListOfShow()) {
            if(show.getId() == id) {
                DataManager.removeShow(show);
                return show;
            }
        }
        return null;
    }

    @Override
    public Show editShow(Show modifiedShow) {
        List<Show> listOfShow = DataManager.getListOfShow();
        for (int i = 0; i < listOfShow.size(); i++) {
            if(listOfShow.get(i).getId() == modifiedShow.getId()) {
                listOfShow.set(i, modifiedShow);
                DataManager.setListOfShow(listOfShow);
                return modifiedShow;
            }
        }
        return null;
    }

    @Override
    public int getNumberOfPlacesLeft(int id) {
        for (Show show : DataManager.getListOfShow()) {
            if (show.getId() == id) {
                return show.getNumberOfPlacesRemaining();
            }
        }
        return -1;
    }

    @Override
    public List<Show> getShows() {
        return DataManager.getListOfShow();
    }
}
