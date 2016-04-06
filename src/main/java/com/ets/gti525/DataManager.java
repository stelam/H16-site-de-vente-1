package com.ets.gti525;

import com.ets.gti525.dao.CredentialDAO;
import com.ets.gti525.dao.ProvinceDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.model.Province;
import com.ets.gti525.model.Ticket;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Component
public class DataManager implements InitializingBean {

    @Autowired
    TheaterDAO theaterDAO;
    @Autowired
    ProvinceDAO provinceDAO;
    @Autowired
    CredentialDAO credentialDAO;

    private int cartReservationMinutes;
    private int inactivityExpirationMinutes;

    @Autowired
    public DataManager(@Value("${cart.reservationtime}") int cartReservationMinutes, @Value("${inactivity.expirationtime}") int inactivityExpirationMinutes) {
        this.cartReservationMinutes = cartReservationMinutes;
        this.inactivityExpirationMinutes = inactivityExpirationMinutes;
    }

    public static HashMap<String, Ticket> ticketsInReservationList = new HashMap<>();

    @Override
    public void afterPropertiesSet() throws Exception {
        initializeProvince();
        initializeCredential();
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

    private void initializeCredential() {
        Credential credential = new Credential();
        credential.setUsername("admin");
        credential.setPassword("1234");
        credential.setRole("ADMIN");
        credentialDAO.save(credential);
    }

    public int getCartReservationMinutes() {
        return cartReservationMinutes;
    }

    public void setCartReservationMinutes(int cartReservationMinutes) {
        this.cartReservationMinutes = cartReservationMinutes;
    }

    public int getInactivityExpirationMinutes() {
        return inactivityExpirationMinutes;
    }

    public void setInactivityExpirationMinutes(int inactivityExpirationMinutes) {
        this.inactivityExpirationMinutes = inactivityExpirationMinutes;
    }

    public void updateReservationList(Long showPresentationId) {
        List<String> ticketsIdToRemove = new ArrayList<>();
        

        for (Map.Entry<String, Ticket> reservedTicket : DataManager.ticketsInReservationList.entrySet()) {
            if (Objects.equals(reservedTicket.getValue().getShowPresentationId(), showPresentationId)) {
                Calendar cal = Calendar.getInstance();
                if (cal.getTimeInMillis() - reservedTicket.getValue().getTimeinmillis() > TimeUnit.MINUTES.toMillis(cartReservationMinutes)) {
                    ticketsIdToRemove.add(reservedTicket.getValue().getTicketId());
                }
            }
        }

        for (String ticketId : ticketsIdToRemove) {
            DataManager.ticketsInReservationList.remove(ticketId);
        }
    }
}
