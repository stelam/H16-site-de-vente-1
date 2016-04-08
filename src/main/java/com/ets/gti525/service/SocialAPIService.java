package com.ets.gti525.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import com.ets.gti525.model.Credential;
import com.ets.gti525.model.TicketOrder;

import org.apache.http.client.ClientProtocolException;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/social")
public interface SocialAPIService {

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    String authenticate(@RequestBody Credential credential) throws IOException, ParseException;
    
    @RequestMapping(value = "/commitToSocial", method = RequestMethod.POST)
    TicketOrder commitToSocial(@RequestBody TicketOrder order, @RequestParam() String accessToken, @RequestParam() String idUser) throws UnsupportedEncodingException, ClientProtocolException, IOException;
}
