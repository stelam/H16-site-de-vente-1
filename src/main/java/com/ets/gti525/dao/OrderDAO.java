package com.ets.gti525.dao;

import com.ets.gti525.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDAO extends CrudRepository<Order, Long>{

}
