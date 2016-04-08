package com.ets.gti525.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.model.TicketOrder;
import com.ets.gti525.service.SocialAPIService;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SocialAPIServiceImpl implements SocialAPIService{

    @Autowired
    private ShowPresentationDAO showPresentationDAO;

	@Override
	public String authenticate(@RequestBody Credential credential) throws IOException, ParseException {
		String url = "https://stark-lowlands-60666.herokuapp.com/auth/authorizationrequest";
		HttpClient httpClient = new DefaultHttpClient();
		
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
	    
	    nameValuePairs.add(new BasicNameValuePair("email", credential.getUsername()));
	    nameValuePairs.add(new BasicNameValuePair("password", credential.getPassword()));
	    nameValuePairs.add(new BasicNameValuePair("client_id", "2"));
	    nameValuePairs.add(new BasicNameValuePair("response_type", "code"));

	    UrlEncodedFormEntity entity;
	    entity = new UrlEncodedFormEntity(nameValuePairs);
	    
	    
		HttpPost request = new HttpPost(url);
        request.addHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setEntity(entity);
		
        HttpResponse response = httpClient.execute((HttpUriRequest) request);
        BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

        String output;
        StringBuffer responseBuffer = new StringBuffer();
        while ((output = br.readLine()) != null) {
        	responseBuffer.append(output);
        }
        
		httpClient.getConnectionManager().shutdown();
		
		
		System.out.println(responseBuffer.toString());
		if (responseBuffer.toString().equals("Login NOT OK!")) {
			return "{}";
		}
		else {
			// parse json
	        JSONObject jsonObj;
	        JSONParser parser = new JSONParser();
	        Object object = parser.parse(responseBuffer.toString());
	        jsonObj = (JSONObject) object;

	        Long userId = (Long) jsonObj.get("userId");
	        String code = (String) jsonObj.get("code");
	        
	        String token = this.getAccessToken(code);
	        
	        return this.getUserById(userId, token);
		}
        
	}
	
	private String getUserById(Long id, String accessToken) throws ClientProtocolException, IOException, ParseException {
		//String accessToken = this.getAccessToken();
		String url = "https://stark-lowlands-60666.herokuapp.com/api/utilisateur/"+String.valueOf(id)+"?access_token="+accessToken;
		System.out.println(url);
		HttpClient httpClient = new DefaultHttpClient();
		
		
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
	    
	    nameValuePairs.add(new BasicNameValuePair("access_token ", "2"));
	    
	    UrlEncodedFormEntity entity;
	    entity = new UrlEncodedFormEntity(nameValuePairs);
	    
		HttpGet request = new HttpGet(url);
        request.addHeader("Content-Type", "application/x-www-form-urlencoded");
		
        HttpResponse response = httpClient.execute((HttpUriRequest) request);
        BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

        String output;
        StringBuffer responseBuffer = new StringBuffer();
        while ((output = br.readLine()) != null) {
        	responseBuffer.append(output);
        }
        
		httpClient.getConnectionManager().shutdown();
		
		System.out.println(responseBuffer.toString());
        JSONObject jsonObj;
        JSONParser parser = new JSONParser();
        Object object = parser.parse(responseBuffer.toString());
        jsonObj = (JSONObject) object;
        jsonObj.put("accessToken", accessToken);
		
        return jsonObj.toString();
		
	}
	
	
	private String getAccessToken(String code) throws ClientProtocolException, IOException, ParseException {
		
		String url = "https://stark-lowlands-60666.herokuapp.com/auth/tokenrequest";
		HttpClient httpClient = new DefaultHttpClient();
		
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
	    
	    nameValuePairs.add(new BasicNameValuePair("client_id", "2"));
	    nameValuePairs.add(new BasicNameValuePair("client_secret", "0e69f839017442fd779ca49f09cab8e66394c894a16f24b4112f7b5f5bc64a9fecebf89e45e010fd2ca9188a5035f4289436064f69070439118587f53c39b72c"));
	    nameValuePairs.add(new BasicNameValuePair("grant_type", "authorization_code"));
	    nameValuePairs.add(new BasicNameValuePair("code", code));
	    
	    UrlEncodedFormEntity entity;
	    entity = new UrlEncodedFormEntity(nameValuePairs);
	    
		HttpPost request = new HttpPost(url);
        request.addHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setEntity(entity);
		
        HttpResponse response = httpClient.execute((HttpUriRequest) request);
        BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

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

        return (String) jsonObj.get("access_token");
		
	}
	
    @Override
    public TicketOrder commitToSocial(@RequestBody TicketOrder order, @RequestParam String accessToken, @RequestParam String idUser) throws ClientProtocolException, IOException {
        for (Ticket ticket : order.getTicketBoughtList()) {
        	for (int i = 0; i<ticket.getQuantity(); i++){
        		//POST /api/billet { “idShow”: 2, “idUser”: 1, “amount”: 99.99 “qrCode”: “9e8ac295a6a01b06d3404a9485ebdfdc74b7c59824d14981a34f72d22746b118f061e5b448167805ad01aa151902be03c90d1cc69c81cf85548136df194f4058” }
        		String url = "https://stark-lowlands-60666.herokuapp.com/api/billet?access_token="+accessToken;
        		HttpClient httpClient = new DefaultHttpClient();
        		
        		// get the ticket amount $
        		ShowPresentation presentation = showPresentationDAO.findOne(ticket.getShowPresentationId());      		
        		
        		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
        	    nameValuePairs.add(new BasicNameValuePair("idShow", String.valueOf(ticket.getShowPresentationId())));
        	    nameValuePairs.add(new BasicNameValuePair("idUser", idUser));
        	    nameValuePairs.add(new BasicNameValuePair("qrCode", ticket.getTicketId()));
        	    nameValuePairs.add(new BasicNameValuePair("amount", String.valueOf(presentation.getPrice())));
        	    
        	    System.out.println(String.valueOf(String.valueOf(ticket.getShowPresentationId())));
        	    
        	    UrlEncodedFormEntity entity;
        	    entity = new UrlEncodedFormEntity(nameValuePairs);
        	    
        		HttpPost request = new HttpPost(url);
                request.addHeader("Content-Type", "application/x-www-form-urlencoded");
                request.setEntity(entity);
        		
                HttpResponse response = httpClient.execute((HttpUriRequest) request);
                
        		httpClient.getConnectionManager().shutdown();
        		

        	}
        }


        return order;
    }

}
