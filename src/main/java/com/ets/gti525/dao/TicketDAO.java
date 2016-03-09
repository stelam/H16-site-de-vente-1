package com.ets.gti525.dao;


import com.ets.gti525.model.Ticket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDAO extends CrudRepository<Ticket, Long>{

    List<Ticket> findByShowPresentationId(Long showPresentationId);

}
