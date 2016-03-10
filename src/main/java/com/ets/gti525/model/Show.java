package com.ets.gti525.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Show {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String artistName;
    private String imageUrl;
    private String description;
    private boolean isFeatured;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ShowPresentation> showPresentationList;

    public Show() {

    }

    //Used to make a deep copy of an object.
    public Show(Show show) {
        this.id = show.id;
        this.name = show.name;
        this.artistName = show.artistName;
        this.imageUrl = show.imageUrl;
        this.description = show.description;
        this.isFeatured = show.isFeatured;
        this.showPresentationList = show.showPresentationList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(boolean isFeatured) {
        this.isFeatured = isFeatured;
    }


    public List<ShowPresentation> getShowPresentationList() {
        return showPresentationList;
    }

    public void setShowPresentationList(List<ShowPresentation> showPresentationList) {
        this.showPresentationList = showPresentationList;
    }
}
