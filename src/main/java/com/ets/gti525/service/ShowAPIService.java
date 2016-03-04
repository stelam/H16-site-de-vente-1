package com.ets.gti525.service;

import com.ets.gti525.model.Show;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/show")
public interface ShowAPIService {

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    Show addShow(@RequestBody Show show);

    @RequestMapping(params = "id", method = RequestMethod.GET)
    Show getShowById(@RequestParam() int id);

    @RequestMapping(params = "showName", method = RequestMethod.GET)
    Show getShowByName(@RequestParam() String showName);

    @RequestMapping(params = "artistName", method = RequestMethod.GET)
    List<Show> getShowsByArtist(@RequestParam() String artistName);

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    Show removeShow(@RequestParam int id);

    @RequestMapping(value = "/modify", method = RequestMethod.PUT)
    Show modifyShow(@RequestBody Show show);

    @RequestMapping(value = "/getPlacesLeft", method = RequestMethod.GET)
    int getNumberOfPlacesLeft(@RequestParam int id);

    @RequestMapping(value = "/shows", method = RequestMethod.GET)
    List<Show> getShowsList();




}
