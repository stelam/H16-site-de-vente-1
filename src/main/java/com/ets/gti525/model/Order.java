package com.ets.gti525.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    private String confirmationNumber;
    private double totalPrice;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Ticket> ticketBought;

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

    public String getConfirmationNumber() {
        return confirmationNumber;
    }

    public void setConfirmationNumber(String confirmationNumber) {
        this.confirmationNumber = confirmationNumber;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<Ticket> getTicketBought() {
        return ticketBought;
    }

    public void setTicketBought(List<Ticket> ticketBought) {
        this.ticketBought = ticketBought;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
