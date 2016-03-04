package com.ets.gti525.dao.impl;

import com.ets.gti525.DataManager;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.model.Theater;

import java.util.List;

public class TheaterDAOStub implements TheaterDAO {

    @Override
    public Theater addTheater(Theater theater) {
        theater.setId(DataManager.generateRandomNumber(2, 100));
        DataManager.addTheater(theater);
        return theater;
    }

    @Override
    public List<Theater> getTheaterList() {
        return DataManager.getListOfTheater();
    }

    @Override
    public Theater getTheaterById(int id) {
        for (Theater theater : DataManager.getListOfTheater()) {
            if (id == theater.getId()) {
                return theater;
            }
        }
        return null;
    }

    @Override
    public Theater removeTheater(int id) {
        for (Theater theater : DataManager.getListOfTheater()) {
            if (theater.getId() == id) {
                DataManager.removeTheater(theater);
                return theater;
            }
        }
        return null;
    }
}
