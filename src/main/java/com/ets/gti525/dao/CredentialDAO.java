package com.ets.gti525.dao;

import com.ets.gti525.model.Credential;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialDAO extends CrudRepository<Credential, Long>{

    Credential findByUsername(String username);

}
