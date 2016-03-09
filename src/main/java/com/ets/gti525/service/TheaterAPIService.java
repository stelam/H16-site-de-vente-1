package com.ets.gti525.service;


import com.ets.gti525.model.Theater;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/theater")
public interface TheaterAPIService {

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    Theater addTheater(@RequestBody Theater theater);

    @RequestMapping(value = "/theaters", method = RequestMethod.GET)
    List<Theater> getTheaterList();

    @RequestMapping(method = RequestMethod.GET)
    Theater getTheaterById(@RequestParam Long id);

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    void removeTheather(@RequestParam Long id);

    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    Theater editTheater(@RequestBody Theater theater);

}
