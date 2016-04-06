// TICKET transfer object


package com.ets.gti525.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class TicketTO {

    @Id
	private Long id_billet;
	private Long id_spectacle;
	private String codeVerification;
		
	public TicketTO(Ticket ticket) {
		this.id_billet = ticket.getId();
		this.id_spectacle = ticket.getShowPresentationId();
		this.codeVerification = ticket.getTicketId();
		
	}

	public Long getId_billet() {
		return id_billet;
	}

	public void setId_billet(Long id_billet) {
		this.id_billet = id_billet;
	}

	public Long getId_spectacle() {
		return id_spectacle;
	}

	public void setId_spectacle(Long id_spectacle) {
		this.id_spectacle = id_spectacle;
	}

	public String getCodeVerification() {
		return codeVerification;
	}

	public void setCodeVerification(String codeVerification) {
		this.codeVerification = codeVerification;
	}

	

}
