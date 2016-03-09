package com.ets.gti525.service.impl;

import com.ets.gti525.dao.ProvinceDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.model.Province;
import com.ets.gti525.model.Theater;
import com.ets.gti525.service.TheaterAPIService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class TheaterAPIServiceImpl implements TheaterAPIService{

    @Autowired
    TheaterDAO theaterDAO;

    @Autowired
    ProvinceDAO provinceDAO;

    @Override
    public Theater addTheater(@RequestBody Theater theater) {
        Province province = provinceDAO.findByProvinceName(theater.getProvince().getProvinceName());
        theater.setProvince(province);
        return theaterDAO.save(theater);
    }

    @Override
    public List<Theater> getTheaterList() {
        return Lists.newArrayList(theaterDAO.findAll());
    }

    @Override
    public Theater getTheaterById(@RequestParam Long id) {

        return theaterDAO.findOne(id);
    }

    @Override
    public void removeTheather(@RequestParam Long id) {
        theaterDAO.delete(id);
    }

    @Override
    public Theater editTheater(@RequestBody Theater theater) {
        return theaterDAO.save(theater);
    }
}
