package com.ets.gti525;

import com.ets.gti525.dao.ProvinceDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.model.Province;
import com.ets.gti525.model.Ticket;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Component
public class DataManager implements InitializingBean {

    @Autowired
    TheaterDAO theaterDAO;
    @Autowired
    ProvinceDAO provinceDAO;

    public static HashMap<String, Ticket> ticketsInReservationList = new HashMap<>();
    private static final int CART_RESERVATION_MINUTES = 1; // maybe put this in a config file/system

    @Override
    public void afterPropertiesSet() throws Exception {
        initializeProvince();
    }

    private void initializeProvince() {
        Province province = new Province();
        province.setProvinceName("Quebec");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Ontario");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Manitoba");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Saskatchewan");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Alberta");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Colombie-Britannique");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nouveau-Brunswick");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nouvelle-Ecosse");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Terre-Neuve et Labrador");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Ile du Prince Edouard");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Yukon");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nunavut");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Territoires du Nord-Ouest");
        provinceDAO.save(province);
    }

    public static void updateReservationList(Long showPresentationId) {
        List<String> ticketsIdToRemove = new ArrayList<>();
        

        for (Map.Entry<String, Ticket> reservedTicket : DataManager.ticketsInReservationList.entrySet()) {
            if (Objects.equals(reservedTicket.getValue().getShowPresentationId(), showPresentationId)) {
                Calendar cal = Calendar.getInstance();
                if (cal.getTimeInMillis() - reservedTicket.getValue().getTimeinmillis() > TimeUnit.MINUTES.toMillis(CART_RESERVATION_MINUTES)) {
                    ticketsIdToRemove.add(reservedTicket.getValue().getTicketId());
                }
            }
        }

        for (String ticketId : ticketsIdToRemove) {
            DataManager.ticketsInReservationList.remove(ticketId);
        }
    }
}
