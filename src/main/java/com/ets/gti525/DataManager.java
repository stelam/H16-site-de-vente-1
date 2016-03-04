package com.ets.gti525;

import com.ets.gti525.model.Show;
import com.ets.gti525.model.Theater;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DataManager {


    private static List<Show> listOfShow = new ArrayList<>();
    private static List<Theater> listOfTheater = new ArrayList<>();

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

        Show show = new Show();
        show.setArtistName("Metallica");
        show.setName("Met on tour");
        show.setDate("12 July 2016");
        show.setDescription("Amazing metallica show yeah");
        show.setFeatured(true);
        show.setId(0);
        show.setNumberOfPlaces(1000);
        show.setPrice(150);
        show.setTheater(theater);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Muse");
        show.setName("Muse Summer Tour");
        show.setDate("15 July 2016");
        show.setDescription("Amazing Muse show yeah");
        show.setFeatured(true);
        show.setId(1);
        show.setNumberOfPlaces(2500);
        show.setPrice(120);
        show.setTheater(theater);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Iron Maiden");
        show.setName("Iron Maiden on Fire tour");
        show.setDate("22 April 2016");
        show.setDescription("Amazing iron maiden show yeah");
        show.setFeatured(true);
        show.setId(2);
        show.setNumberOfPlaces(2000);
        show.setPrice(130);
        show.setTheater(theater2);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Lamb of God");
        show.setName("Last album tour");
        show.setDate("29 July 2016");
        show.setDescription("Amazing lamb of god show yeah");
        show.setFeatured(true);
        show.setId(3);
        show.setNumberOfPlaces(1000);
        show.setPrice(150);
        show.setTheater(theater2);
        listOfShow.add(show);

        show = new Show();
        show.setArtistName("Bullet for my Valentine");
        show.setName("British invasion tour");
        show.setDate("12 September 2016");
        show.setDescription("Amazing bfmv show yeah");
        show.setFeatured(true);
        show.setId(4);
        show.setNumberOfPlaces(2100);
        show.setPrice(75);
        show.setTheater(theater);
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
}
