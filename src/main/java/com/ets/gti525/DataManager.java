package com.ets.gti525;

import com.ets.gti525.dao.CredentialDAO;
import com.ets.gti525.dao.ProvinceDAO;
import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.TheaterDAO;
import com.ets.gti525.dao.TicketDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.model.Province;
import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Theater;
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
    @Autowired
    ShowDAO showDAO;
    @Autowired
    TicketDAO ticketDAO;

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
        initializeTheaters();
        initializeShows();
        initTickets();
    }
    
    private void initializeTheaters() {
    	Theater theater = new Theater();
    	theater.setId((long)1);
    	theater.setName("Île Sainte-Hélène Est");
    	theater.setPhoneNumber("514-555-5555");
    	theater.setZipCode("H3C 1A9");
    	theater.setAddress("Parc Jean-Drapeau");
    	theater.setCity("Montréal");
    	theater.setCapacity(3000);
    	theater.setActive(true);
    	theater.setProvince(provinceDAO.findByProvinceName("Québec"));
    	theaterDAO.save(theater);
    }
    
    private void initializeShows(){
    	Show show = new Show();
    	show.setId((long)1);
    	show.setName("Heavy MONTRÉAL");
    	show.setArtistName("Artistes variés");
    	show.setImageUrl("http://www.metalsucks.net/wp-content/uploads/2013/03/Heavy-MTL-2013.jpg");
    	show.setIsFeatured(true);
    	show.setDescription("Le festival de musique Heavy MONTRÉAL est la destination nord-américaine par excellence des amateurs de musique rock, punk et heavy metal. Depuis sa première édition en 2008, le festival a accueilli près de 300 000 fans qui se sont rassemblés pour y voir des groupes comme Metallica, Iron Maiden et plusieurs autres.");
    	show.setActive(true);
    	
    	ShowPresentation showPresentation = new ShowPresentation();
    	showPresentation.setId((long)1);
    	showPresentation.setTimeinmillis((long)1460088000000L);
    	showPresentation.setNumberOfPlaces(3000);
    	showPresentation.setPrice(179.59);
    	showPresentation.setActive(false);
    	
    	Theater theater = new Theater();
    	theater.setId((long)1);
    	theater.setName("Île Sainte-Hélène Est");
    	theater.setPhoneNumber("514-555-5555");
    	theater.setZipCode("H3C 1A9");
    	theater.setAddress("Parc Jean-Drapeau");
    	theater.setCity("Montréal");
    	theater.setCapacity(3000);
    	theater.setActive(true);
    	theater.setProvince(provinceDAO.findByProvinceName("Québec"));
    	
    	showPresentation.setTheater(theater);
    	List<ShowPresentation> showPresentationList = new ArrayList<>();
    	showPresentationList.add(showPresentation);
    	
    	show.setShowPresentationList(showPresentationList);
    	showDAO.save(show);
    	
    	show.setId((long)2);
    	show.setName("Spectacle de test");
    	show.setArtistName("Testeurs");
    	show.setDescription("Ceci est un test.");
    	show.setImageUrl("images/show-0.jpg");
    	show.setIsFeatured(true);
    	show.setActive(true);
    	
    	showPresentation.setId((long)2);
    	showPresentation.setTimeinmillis((long)1460001600000L);
    	showPresentation.setNumberOfPlaces(20);
    	showPresentation.setPrice(12.99);
    	showPresentation.setActive(false);
    	showPresentation.setTheater(theater);
    	
    	showPresentationList = new ArrayList<>();
    	showPresentationList.add(showPresentation);
    	
    	show.setShowPresentationList(showPresentationList);
    	showDAO.save(show);
    }
    
    private void initTickets(){
    	Ticket ticket = new Ticket();
    	ticket.setId((long)1);
    	ticket.setTicketId("9c7610e7-13f2-4571-bb70-fd3caf92feff");
    	ticket.setShowPresentationId((long)1);
    	ticket.setTimeinmillis(1460087919095L);
    	ticket.setExpiringTimeinmillis(null);
    	ticket.setInactivityExpirationDelay(20);
    	ticket.setQuantity(1);
    	ticketDAO.save(ticket);
    	
    	ticket = new Ticket();
    	ticket.setId((long)2);
    	ticket.setTicketId("737c348e-2f21-48ce-96f3-4f08b01cd83d");
    	ticket.setShowPresentationId((long)1);
    	ticket.setTimeinmillis(1460087919095L);
    	ticket.setExpiringTimeinmillis(null);
    	ticket.setInactivityExpirationDelay(20);
    	ticket.setQuantity(1);
    	ticketDAO.save(ticket);

    	ticket = new Ticket();
    	ticket.setId((long)3);
    	ticket.setTicketId("c65c68b6-ba6e-4be1-8dd6-bf410101b9e7");
    	ticket.setShowPresentationId((long)1);
    	ticket.setTimeinmillis(1460087919095L);
    	ticket.setExpiringTimeinmillis(null);
    	ticket.setInactivityExpirationDelay(20);
    	ticket.setQuantity(1);
    	ticketDAO.save(ticket);
    }

    private void initializeProvince() {
        Province province = new Province();
        province.setProvinceName("Alberta");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Colombie-Britannique");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Île-du-Prince-Édouard");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Manitoba");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nouveau-Brunswick");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nouvelle-Écosse");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Ontario");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Québec");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Saskatchewan");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Terre-Neuve-et-Labrador");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Nunavut");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Territoire du Nord-Ouest");
        provinceDAO.save(province);

        province = new Province();
        province.setProvinceName("Yukon");
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
