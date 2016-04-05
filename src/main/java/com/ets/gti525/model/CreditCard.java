package com.ets.gti525.model;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


public class CreditCard {

    String number;
    String first_name;
    String last_name;
    int ccv;
    String expiration_month;
    String expiration_year;
    
    
}
