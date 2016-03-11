package com.ets.gti525.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class ShowPresentation {

    @Id
    @GeneratedValue
    private Long id;
    private long timeinmillis;
    private int numberOfPlaces;
    private double price;
    private boolean active;

    @OneToOne()
    private Theater theater;

    public ShowPresentation() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getTimeinmillis() {
        return timeinmillis;
    }

    public void setTimeinmillis(long timeinmillis) {
        this.timeinmillis = timeinmillis;
    }

    public int getNumberOfPlaces() {
        return numberOfPlaces;
    }

    public void setNumberOfPlaces(int numberOfPlaces) {
        this.numberOfPlaces = numberOfPlaces;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
