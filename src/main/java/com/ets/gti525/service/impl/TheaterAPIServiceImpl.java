package com.ets.gti525.service.impl;

import com.ets.gti525.model.Theater;
import com.ets.gti525.service.TheaterAPIService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class TheaterAPIServiceImpl implements TheaterAPIService{

    @Override
    public Theater addTheater(@RequestBody Theater theater) {
        return null;
    }

    @Override
    public List<Theater> getTheaterList() {
        return null;
    }

    @Override
    public Theater getTheaterById(@RequestParam int id) {
        return new Theater();
    }

    @Override
    public Theater removeTheather(@RequestParam int id) {
        return null;
    }
}
