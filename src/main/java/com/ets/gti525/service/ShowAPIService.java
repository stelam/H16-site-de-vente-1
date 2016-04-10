package com.ets.gti525.service;

import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentationWrapper;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/show")
public interface ShowAPIService {

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    Show addShow(@RequestBody Show show);

    @RequestMapping(params = "id", method = RequestMethod.GET)
    Show getShowById(@RequestParam() Long id);

    @RequestMapping(params = "showName", method = RequestMethod.GET)
    Show getShowByName(@RequestParam() String showName);

    @RequestMapping(value = "/featured", method = RequestMethod.GET)
    List<Show> getFeaturedShow();

    @RequestMapping(params = "artistName", method = RequestMethod.GET)
    List<Show> getShowsByArtist(@RequestParam() String artistName);
    
    @RequestMapping(params = "theaterId", method = RequestMethod.GET)
    List<Show> getShowsByTheater(@RequestParam() Long theaterId);

    @RequestMapping(params = "timeinmillis", method = RequestMethod.GET)
    List<Show> getShowsByDate(@RequestParam() long timeinmillis);

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    void removeShow(@RequestParam Long id);

    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    Show editShow(@RequestBody Show show);

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    List<Show> searchByArtistOrByName(@RequestParam() String query);

    @RequestMapping(value = "/isShowAvailable", method = RequestMethod.GET)
    boolean isShowAvailable(@RequestParam Long presentationShowId, @RequestParam Long quantity, HttpServletRequest request);

    @RequestMapping(value = "/isShowClosed", method = RequestMethod.GET)
    boolean isShowClosed(@RequestParam Long presentationShowId);

    @RequestMapping(value = "/shows", method = RequestMethod.GET)
    List<Show> getShowsList();

    @RequestMapping(value = "/showPresentationDetails", method = RequestMethod.GET)
    ShowPresentationWrapper getShowPresentationDetails(@RequestParam Long presentationShowId);

}
