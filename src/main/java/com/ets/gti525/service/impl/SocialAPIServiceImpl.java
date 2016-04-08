package com.ets.gti525.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.ets.gti525.model.Credential;
import com.ets.gti525.service.SocialAPIService;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.AbstractHttpMessage;
import org.apache.http.message.BasicNameValuePair;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SocialAPIServiceImpl implements SocialAPIService{



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
		
        return responseBuffer.toString();
		
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
	
	private AbstractHttpMessage initConnection(String method, String url, StringEntity params) throws IOException {
		
		if (method.equals("POST")){
			HttpPost request = new HttpPost(url);
	        params.setContentType("application/x-www-form-urlencoded");
	        request.addHeader("Content-Type", "application/x-www-form-urlencoded");
	        request.addHeader("Accept", "application/x-www-form-urlencoded");
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
}
