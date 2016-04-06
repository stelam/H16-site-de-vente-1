package com.ets.gti525.service.impl;

import com.ets.gti525.model.Payment;
import com.ets.gti525.model.PaymentIntent;
import com.ets.gti525.model.PaymentPreauthorization;
import com.ets.gti525.service.PaymentAPIService;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.AbstractHttpMessage;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;


@Controller
public class PaymentAPIServiceImpl implements PaymentAPIService{

	private final String USER_AGENT = "Mozilla/5.0";
	
	@Override
	public PaymentPreauthorization preauthorizePayment(@RequestBody Payment payment) throws ParseException, IOException {
		return this.postPaymentPreauthorization(payment);
	}
	

	@Override
	public void sendPayment(@RequestBody PaymentIntent intent) throws ParseException, IOException {
		this.patchSendPayment(intent);
	}
	
	private AbstractHttpMessage initConnection(String method, String url, StringEntity params) throws IOException {
		
		if (method.equals("POST")){
			HttpPost request = new HttpPost(url);
	        params.setContentType("application/json");
	        request.addHeader("content-type", "application/json");
	        request.addHeader("Accept", "application/json");
	        request.addHeader("X-API-KEY", "13098dad-a371-47c1-b8f3-e828026abb59");
	        request.setEntity(params);
	        return request;
		} else {
			HttpPatch request = new HttpPatch(url);
	        params.setContentType("application/json");
	        request.addHeader("content-type", "application/json");
	        request.addHeader("Accept", "application/json");
	        request.addHeader("X-API-KEY", "13098dad-a371-47c1-b8f3-e828026abb59");
	        request.setEntity(params);
	        return request;
		}
		
	}
	
	private PaymentPreauthorization postPaymentPreauthorization(Payment pay) throws IOException, ParseException {
		String url = "https://aqueous-crag-25661.herokuapp.com/api/payments";
		HttpClient httpClient = new DefaultHttpClient();
		
		// constructing json object to send as parameter
		JSONObject payment = new JSONObject();
		JSONObject creditCard = new JSONObject();
		
		payment.put("amount", pay.getAmount());
		payment.put("label", pay.getLabel());

		creditCard.put("number", pay.getCredit_card().getNumber());
		creditCard.put("first_name", pay.getCredit_card().getFirst_name());
		creditCard.put("last_name", pay.getCredit_card().getLast_name());
		creditCard.put("cvv", pay.getCredit_card().getCvv());
		creditCard.put("expiration_month", pay.getCredit_card().getExpiration_month());
		creditCard.put("expiration_year", pay.getCredit_card().getExpiration_year());

		payment.put("credit_card", creditCard);
		
		StringEntity params = new StringEntity(payment.toString(),"UTF-8");
		AbstractHttpMessage request = this.initConnection("POST", url, params);
		
        
        HttpResponse response = httpClient.execute((HttpUriRequest) request);
        BufferedReader br = new BufferedReader(
                new InputStreamReader((response.getEntity().getContent())));

        String output;
        StringBuffer responseBuffer = new StringBuffer();
        while ((output = br.readLine()) != null) {
        	responseBuffer.append(output);
        }
        
		httpClient.getConnectionManager().shutdown();
		
		
		// parse json
        JSONObject jsonObj;
        JSONParser parser = new JSONParser();
        Object object = parser.parse(responseBuffer.toString());
        jsonObj = (JSONObject) object;
		PaymentPreauthorization pp = new PaymentPreauthorization(jsonObj);
		
		return pp;
	}
	
	private void patchSendPayment(PaymentIntent intent) throws IOException {
		System.out.println("sending");
		String url = "https://aqueous-crag-25661.herokuapp.com/api/payments/" + intent.getClient_id();
		HttpClient httpClient = new DefaultHttpClient();
		
		JSONObject intentObject = new JSONObject();
		intentObject.put("intent", intent.getIntent());
		
		StringEntity params = new StringEntity(intentObject.toString(),"UTF-8");
		AbstractHttpMessage request = this.initConnection("PATCH", url, params);
		
		httpClient.execute((HttpUriRequest) request);
		
		httpClient.getConnectionManager().shutdown();

	}

    
}
