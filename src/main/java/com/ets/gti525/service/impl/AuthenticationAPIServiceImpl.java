package com.ets.gti525.service.impl;

import com.ets.gti525.model.Credential;
import com.ets.gti525.service.AuthenticationAPIService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AuthenticationAPIServiceImpl implements AuthenticationAPIService{

    @Override
    public String authenticateUser(@RequestBody Credential credential) {
        return "Im the best";
    }
}
