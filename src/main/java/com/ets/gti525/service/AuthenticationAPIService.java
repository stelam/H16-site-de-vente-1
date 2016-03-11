package com.ets.gti525.service;

import com.ets.gti525.model.Credential;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/authentication")
public interface AuthenticationAPIService {

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    String authenticateUser(HttpServletRequest httpServletRequest, @RequestBody Credential credential);

}
