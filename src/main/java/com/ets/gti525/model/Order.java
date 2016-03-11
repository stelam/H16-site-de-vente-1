package com.ets.gti525.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    private String confirmationId;
    private double totalPrice;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Ticket> ticketBoughtList;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    public Order() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfirmationId() {
        return confirmationId;
    }

    public void setConfirmationId(String confirmationId) {
        this.confirmationId = confirmationId;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<Ticket> getTicketBoughtList() {
        return ticketBoughtList;
    }

    public void setTicketBoughtList(List<Ticket> ticketBoughtList) {
        this.ticketBoughtList = ticketBoughtList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
