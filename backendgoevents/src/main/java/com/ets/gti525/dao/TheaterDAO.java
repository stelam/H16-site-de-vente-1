package com.ets.goevents.dao;


import com.ets.goevents.model.Theater;

import java.util.List;

public interface TheaterDAO {

    Theater addTheater(Theater theater);
    List<Theater> getTheaterList();
    Theater getTheaterById(int id);
    Theater removeTheater(int id);

}
