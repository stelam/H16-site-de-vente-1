package com.ets.gti525.dao;


import com.ets.gti525.model.Theater;

import java.util.List;

public interface TheaterDAO {

    Theater addTheater(Theater theater);
    List<Theater> getTheaterList();
    Theater getTheaterById(int id);
    Theater removeTheater(int id);

}
