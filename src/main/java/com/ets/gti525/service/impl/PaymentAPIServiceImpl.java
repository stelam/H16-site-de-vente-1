package com.ets.gti525.service.impl;

import com.ets.gti525.dao.CredentialDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.model.Payment;
import com.ets.gti525.model.PaymentPreauthorization;
import com.ets.gti525.service.AuthenticationAPIService;
import com.ets.gti525.service.PaymentAPIService;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;







import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;


@Controller
public class PaymentAPIServiceImpl implements PaymentAPIService{

	private final String USER_AGENT = "Mozilla/5.0";
	
	@Override
	public PaymentPreauthorization preauthorizePayment(Payment payment) {
		try {
			this.postPaymentPreauthorization();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	private void postPaymentPreauthorization() throws IOException {
		String url = "https://aqueous-crag-25661.herokuapp.com/api/payments";
		URL obj = new URL(url);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		//add reuquest header
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Accept", "application/json");
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
		con.setRequestProperty("X-API-KEY", "13098dad-a371-47c1-b8f3-e828026abb59");

		//String urlParameters = "sn=C02G8416DRJM&cn=&locale=&caller=&num=12345";
		JSONObject payment = new JSONObject();
		JSONObject creditCard = new JSONObject();
		JSONObject parent = new JSONObject();
		
		payment.put("amount","20.00");
		payment.put("label","Ceci est un test");
		
		creditCard.put("number", "1337474812964632");
		creditCard.put("first_name", "John");
		creditCard.put("last_name", "Doe");
		creditCard.put("cvv", 339);
		creditCard.put("expiration_month", "04");
		creditCard.put("expiration_year", "2018");
		
		payment.put("credit_card", creditCard);
		
		con.setDoOutput(true);
		
		OutputStreamWriter wr= new OutputStreamWriter(con.getOutputStream());
		wr.write(payment.toString());
		
		// Send post request
		
		//DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		//wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + payment.toString());
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		//print result
		System.out.println(response.toString());

	}
    
}
