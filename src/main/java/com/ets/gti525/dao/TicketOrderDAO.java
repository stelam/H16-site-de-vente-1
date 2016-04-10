package com.ets.gti525.dao;


import com.ets.gti525.model.Ticket;
import com.ets.gti525.model.TicketOrder;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketOrderDAO extends CrudRepository<TicketOrder, Long>{


}
