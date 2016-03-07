package com.ets.gti525.service;

import com.ets.gti525.model.Credential;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/authentication")
public interface AuthenticationAPIService {

    @RequestMapping(value = "/authenticate", method = RequestMethod.GET)
    String authenticateUser(@RequestBody Credential credential);

}
