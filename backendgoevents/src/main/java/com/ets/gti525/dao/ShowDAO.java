package com.ets.gti525.dao;

import com.ets.gti525.model.Show;

import java.util.List;

public interface ShowDAO {

    Show addShow(Show show);
    Show findShowByName(String name);
    Show findShowById(int id);
    List<Show> findShowsByArtist(String name);
    Show removeShow(int id);
    Show editShow(Show show);
    int getNumberOfPlacesLeft(int id);
    List<Show> getShows();
}



