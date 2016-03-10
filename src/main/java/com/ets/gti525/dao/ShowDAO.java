package com.ets.gti525.dao;

import com.ets.gti525.model.Show;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowDAO extends JpaRepository<Show, Long> {

    Show findShowByName(String name);
    List<Show> findByArtistName(String artistName);
    List<Show> findByIsFeaturedTrue();
}



