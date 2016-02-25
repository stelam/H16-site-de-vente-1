package com.ets.gti525.dao;

import com.ets.gti525.model.Reservation;

public interface ReservationDAO {

    Reservation addReservation(Reservation reservation);
    Reservation removeReservation(Reservation reservation);
    Reservation removeReservationById(int id);

}
