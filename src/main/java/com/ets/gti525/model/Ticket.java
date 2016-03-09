package com.ets.gti525.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    private Long showPresentationId;

    public Ticket() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShowPresentationId() {
        return showPresentationId;
    }

    public void setShowPresentationId(Long showPresentationId) {
        this.showPresentationId = showPresentationId;
    }
}
