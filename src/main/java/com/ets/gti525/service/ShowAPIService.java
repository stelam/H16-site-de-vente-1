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

    @RequestMapping(value = "/featured", method = RequestMethod.GET)
    List<Show> getFeaturedShow();

    @RequestMapping(params = "artistName", method = RequestMethod.GET)
    List<Show> getShowsByArtist(@RequestParam() String artistName);

    @RequestMapping(params = "timeinmillis", method = RequestMethod.GET)
    List<Show> getShowsByDate(@RequestParam() long timeinmillis);

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    Show removeShow(@RequestParam int id);

    @RequestMapping(value = "/modify", method = RequestMethod.PUT)
    Show modifyShow(@RequestBody Show show);

    @RequestMapping(value = "/isShowAvailable", method = RequestMethod.GET)
    boolean isShowAvailable(@RequestParam int presentationShowId);

    @RequestMapping(value = "/shows", method = RequestMethod.GET)
    List<Show> getShowsList();




}
