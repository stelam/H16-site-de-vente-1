package com.ets.gti525.service;

import java.io.IOException;

import com.ets.gti525.model.Credential;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/social")
public interface SocialAPIService {

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    String authenticate(@RequestBody Credential credential) throws IOException, ParseException;

}
