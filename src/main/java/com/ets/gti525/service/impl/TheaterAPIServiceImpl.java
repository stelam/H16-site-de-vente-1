package com.ets.gti525.service.impl;

import com.ets.gti525.BusinessDelegate;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.model.Theater;
import com.ets.gti525.service.TheaterAPIService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class TheaterAPIServiceImpl implements TheaterAPIService{

    TheaterDAO theaterDAO;

    @Override
    public Theater addTheater(@RequestBody Theater theater) {
        theaterDAO = BusinessDelegate.getTheaterDAO();
        return theaterDAO.addTheater(theater);
    }

    @Override
    public List<Theater> getTheaterList() {
        theaterDAO = BusinessDelegate.getTheaterDAO();
        return theaterDAO.getTheaterList();
    }

    @Override
    public Theater getTheaterById(@RequestParam int id) {
        theaterDAO = BusinessDelegate.getTheaterDAO();
        return theaterDAO.getTheaterById(id);
    }

    @Override
    public Theater removeTheather(@RequestParam int id) {
        theaterDAO = BusinessDelegate.getTheaterDAO();
        return theaterDAO.removeTheater(id);
    }
}
