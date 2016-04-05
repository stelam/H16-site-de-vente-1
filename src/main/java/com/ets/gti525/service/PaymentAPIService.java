package com.ets.gti525.service;

import com.ets.gti525.model.PaymentPreauthorization;
import com.ets.gti525.model.Payment;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/payment")
public interface PaymentAPIService {

    @RequestMapping(value = "/payments", method = RequestMethod.GET)
    PaymentPreauthorization preauthorizePayment(@RequestBody Payment payment);
    
}
