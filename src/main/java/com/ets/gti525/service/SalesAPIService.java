package com.ets.gti525.service;


import com.ets.gti525.model.Theater;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/theater")
public interface SalesAPIService {


    @RequestMapping(value = "/sales", method = RequestMethod.GET)
    List<Theater> getTheaterList();


}
