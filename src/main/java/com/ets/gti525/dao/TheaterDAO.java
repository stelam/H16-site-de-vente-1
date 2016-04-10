package com.ets.gti525.dao;

import com.ets.gti525.model.Theater;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterDAO extends CrudRepository<Theater, Long>, JpaSpecificationExecutor<Theater> {

	Theater findById(Long id);
}
