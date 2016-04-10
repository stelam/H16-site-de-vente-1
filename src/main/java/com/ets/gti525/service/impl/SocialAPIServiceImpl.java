package com.ets.gti525.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.ets.gti525.dao.ShowDAO;
import com.ets.gti525.dao.ShowPresentationDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.model.Show;
import com.ets.gti525.model.ShowPresentation;
import com.ets.gti525.model.Ticket;
import com.ets.gti525.model.TicketOrder;
import com.ets.gti525.service.SocialAPIService;
import com.google.common.collect.Lists;

import org.apache.http.HttpEntity;
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
import org.apache.http.util.EntityUtils;
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
    
    @Autowired
    private ShowDAO showDAO;

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
        		HttpClient httpClient = new DefaultHttpClient();
        		
        		// get the presentation
        		ShowPresentation presentation = showPresentationDAO.findOne(ticket.getShowPresentationId());   
        		
        		// get the show
        		System.out.println(presentation.getId());
        		Show show = this.getShowByShowPresentationId(presentation.getId());
        		
        		// format date
        		String formattedDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").format(presentation.getTimeinmillis());
        		System.out.println(formattedDate);
        		
        		// créer le spectacle
        		// POST /api/spectacle { “name”: “Osheaga”, “artist”: “Metallica”, “datetime”: “yyyy-MM-dd’T’HH:mm:ssX”, “location”: “Montreal” }
        		String url = "https://stark-lowlands-60666.herokuapp.com/api/spectacle";
        		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
        	    nameValuePairs.add(new BasicNameValuePair("name", show.getName()));
        	    nameValuePairs.add(new BasicNameValuePair("artist", show.getArtistName()));
        	    nameValuePairs.add(new BasicNameValuePair("datetime", formattedDate));
        	    nameValuePairs.add(new BasicNameValuePair("location", presentation.getTheater().getName()));
        	    nameValuePairs.add(new BasicNameValuePair("access_token", accessToken));

        	    UrlEncodedFormEntity entity;
        	    entity = new UrlEncodedFormEntity(nameValuePairs);
        	    
        		HttpPost request = new HttpPost(url);
                request.addHeader("Content-Type", "application/x-www-form-urlencoded");
                request.setEntity(entity);
        		
                HttpResponse response = httpClient.execute((HttpUriRequest) request);
                HttpEntity httpE = response.getEntity();
                String showId = EntityUtils.toString(httpE, "UTF-8");
                
        		httpClient.getConnectionManager().shutdown();
        		httpClient = new DefaultHttpClient();
        		
        		//POST /api/billet { “idShow”: 2, “idUser”: 1, “amount”: 99.99 “qrCode”: “9e8ac295a6a01b06d3404a9485ebdfdc74b7c59824d14981a34f72d22746b118f061e5b448167805ad01aa151902be03c90d1cc69c81cf85548136df194f4058” }
        		url = "https://stark-lowlands-60666.herokuapp.com/api/billet?access_token="+accessToken;

        	    BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));


        		
        		nameValuePairs = new ArrayList<NameValuePair>();
        	    nameValuePairs.add(new BasicNameValuePair("idShow", showId)); // pour l'instant
        	    nameValuePairs.add(new BasicNameValuePair("idUser", idUser));
        	    nameValuePairs.add(new BasicNameValuePair("qrCode", ticket.getTicketId()));
        	    nameValuePairs.add(new BasicNameValuePair("amount", String.valueOf(presentation.getPrice())));
        	    
        	    System.out.println(String.valueOf(String.valueOf(ticket.getShowPresentationId())));
        	    
        	    entity = new UrlEncodedFormEntity(nameValuePairs);
        	    
    	    	request = new HttpPost(url);
                request.addHeader("Content-Type", "application/x-www-form-urlencoded");
                request.setEntity(entity);
        		
            	response = httpClient.execute((HttpUriRequest) request);
                
        		httpClient.getConnectionManager().shutdown();
        		

        	}
        }


        return order;
    }
    
    protected Show getShowByShowPresentationId(Long showPresentationId){

        List<Show> showList = Lists.newArrayList(showDAO.findAll());

        for (Show show : showList) {
            if (show.getShowPresentationList() != null) {
            	for (ShowPresentation sp : show.getShowPresentationList()) {
            		if (sp.getId() == showPresentationId) {
            			return show;
            		}
            	}
            }
        }
        
        return null;
    }
}
