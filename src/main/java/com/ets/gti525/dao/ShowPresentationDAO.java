package com.ets.gti525.dao;


import com.ets.gti525.model.ShowPresentation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowPresentationDAO extends CrudRepository<ShowPresentation, Long> {

}
