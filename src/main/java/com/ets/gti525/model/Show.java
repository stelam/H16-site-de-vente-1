package com.ets.gti525.model;


import java.util.List;

public class Show {

    private int id;
    private String name;
    private String artistName;
    private String imageUrl;
    private String description;
    private boolean isFeatured;
    private List<ShowPresentation> showPresentationList;

    public Show() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFeatured() {
        return isFeatured;
    }

    public void setFeatured(boolean featured) {
        isFeatured = featured;
    }


    public List<ShowPresentation> getShowPresentationList() {
        return showPresentationList;
    }

    public void setShowPresentationList(List<ShowPresentation> showPresentationList) {
        this.showPresentationList = showPresentationList;
    }
}
