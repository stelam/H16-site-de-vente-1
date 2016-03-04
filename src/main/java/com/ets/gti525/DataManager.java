package com.ets.gti525;

import com.ets.gti525.model.Show;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DataManager {


    private static List<Show> listOfShow = new ArrayList<>();

    public static void initializeData() {
        Show show = new Show();
        show.setArtistName("Metallica");
        show.setName("Met on tour");
        show.setDate("12 July 2016");
        show.setDescription("Amazing metallica show yeah");
        show.setFeatured(true);
        show.setId(0);
        show.setNumberOfPlaces(1000);
        show.setPrice(150);
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
}
