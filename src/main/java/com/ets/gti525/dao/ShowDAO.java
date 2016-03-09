package com.ets.gti525.dao;

import com.ets.gti525.model.Show;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowDAO extends CrudRepository<Show, Long>{

    Show findShowByName(String name);
    List<Show> findByArtistName(String artistName);
    List<Show> findByIsFeaturedTrue();
}



