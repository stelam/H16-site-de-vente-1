package com.ets.gti525.service.impl;

import com.ets.gti525.model.Credential;
import com.ets.gti525.service.AuthenticationAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AuthenticationAPIServiceImpl implements AuthenticationAPIService{

    @Override
    public String authenticateUser(@RequestBody Credential credential) {
        return "Im the best";
    }
}
