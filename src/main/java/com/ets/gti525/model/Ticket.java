package com.ets.gti525.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    private int showPresentationId;

    public Ticket() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getShowPresentationId() {
        return showPresentationId;
    }

    public void setShowPresentationId(int showPresentationId) {
        this.showPresentationId = showPresentationId;
    }
}
