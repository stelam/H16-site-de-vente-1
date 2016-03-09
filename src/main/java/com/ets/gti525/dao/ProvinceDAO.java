package com.ets.gti525.dao;

import com.ets.gti525.model.Province;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinceDAO extends CrudRepository<Province, Long>{

    Province findByProvinceName(String provinceName);

}
