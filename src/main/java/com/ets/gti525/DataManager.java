package com.ets.gti525;

import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Theater;
import com.ets.gti525.model.Ticket;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class DataManager {


    private static List<Show> listOfShow = new ArrayList<>();
    private static List<Theater> listOfTheater = new ArrayList<>();
    private static List<Ticket> listOfTicket = new ArrayList<>();
    private static List<ShowPresentation> listOfShowPresentation = new ArrayList<>();

    public static void initializeData() {
        Theater theater = new Theater();
        theater.setId(0);
        theater.setActive(true);
        theater.setAddress("123 rue blabla, montreal");
        theater.setCapacity(3500);
        theater.setName("Metropolis");
        listOfTheater.add(theater);

        Theater theater2 = new Theater();
        theater2.setId(1);
        theater2.setActive(true);
        theater2.setAddress("333 rue omg, lollaval");
        theater2.setCapacity(2000);
        theater2.setName("Montmorency");
        listOfTheater.add(theater2);

        ShowPresentation showPresentation = new ShowPresentation();
        showPresentation.setId(0);
        showPresentation.setNumberOfPlaces(2500);
        showPresentation.setTheater(theater);
        showPresentation.setPrice(59.99);
        showPresentation.setTimeinmillis(1457222400000L);

        ShowPresentation showPresentation2 = new ShowPresentation();
        showPresentation2.setId(1);
        showPresentation2.setNumberOfPlaces(2500);
        showPresentation2.setTheater(theater);
        showPresentation.setPrice(59.99);
        showPresentation2.setTimeinmillis(1457308800000L);

        ShowPresentation showPresentation3 = new ShowPresentation();
        showPresentation3.setId(2);
        showPresentation3.setNumberOfPlaces(2000);
        showPresentation3.setTheater(theater2);
        showPresentation.setPrice(89.99);
        showPresentation3.setTimeinmillis(1457395200000L);

        listOfShowPresentation.add(showPresentation);
        listOfShowPresentation.add(showPresentation2);
        listOfShowPresentation.add(showPresentation3);

        Show show = new Show();
        show.setArtistName("Metallica");
        show.setName("Met on tour");
        show.setDescription("Amazing metallica show yeah");
        show.setFeatured(true);
        show.setId(0);
        show.setShowPresentationList(listOfShowPresentation);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Muse");
        show.setName("Muse Summer Tour");
        show.setDescription("Amazing Muse show yeah");
        show.setFeatured(false);
        show.setId(1);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Iron Maiden");
        show.setName("Iron Maiden on Fire tour");
        show.setDescription("Amazing iron maiden show yeah");
        show.setFeatured(true);
        show.setId(2);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Lamb of God");
        show.setName("Last album tour");
        show.setDescription("Amazing lamb of god show yeah");
        show.setFeatured(false);
        show.setId(3);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Bullet for my Valentine");
        show.setName("British invasion tour");
        show.setDescription("Amazing bfmv show yeah");
        show.setFeatured(true);
        show.setId(4);
        listOfShow.add(show);
    }

    public static int generateRandomNumber(int min, int max) {
        Random random = new Random();
        return random.nextInt((max - min) + 1) + min;
    }

    public static void addShow(Show show) {
        DataManager.listOfShow.add(show);
    }

    public static void setListOfShow(List<Show> listOfShow) {
        DataManager.listOfShow = listOfShow;
    }

    public static List<Show> getListOfShow() {
        return listOfShow;
    }

    public static void removeShow(Show show) {
        DataManager.listOfShow.remove(show);
    }

    public static List<Theater> getListOfTheater() {
        return listOfTheater;
    }

    public static void setListOfTheater(List<Theater> listOfTheater) {
        DataManager.listOfTheater = listOfTheater;
    }

    public static void addTheater(Theater theater) {
        DataManager.listOfTheater.add(theater);
    }

    public static void removeTheater(Theater theater) {
        DataManager.listOfTheater.remove(theater);
    }

    public static List<Ticket> getListOfTicket() {
        return listOfTicket;
    }

    public static void setListOfTicket(List<Ticket> listOfTicket) {
        DataManager.listOfTicket = listOfTicket;
    }

    public static List<ShowPresentation> getListOfShowPresentation() {
        return listOfShowPresentation;
    }

    public static void setListOfShowPresentation(List<ShowPresentation> listOfShowPresentation) {
        DataManager.listOfShowPresentation = listOfShowPresentation;
    }
}
