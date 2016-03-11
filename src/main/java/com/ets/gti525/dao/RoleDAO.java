package com.ets.gti525.dao;

import com.ets.gti525.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends CrudRepository<Role, Long>{

}
