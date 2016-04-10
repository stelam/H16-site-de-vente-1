package com.ets.gti525.service;

import java.io.IOException;

import com.ets.gti525.model.PaymentIntent;
import com.ets.gti525.model.PaymentPreauthorization;
import com.ets.gti525.model.Payment;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/payment")
public interface PaymentAPIService {

    @RequestMapping(value = "/preauthorize", method = RequestMethod.POST)
    PaymentPreauthorization preauthorizePayment(@RequestBody Payment payment) throws ParseException, IOException;
    
    @RequestMapping(value = "/send", method = RequestMethod.POST)
    void sendPayment(@RequestBody PaymentIntent intent) throws ParseException, IOException;
}
