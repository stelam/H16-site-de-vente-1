package com.ets.gti525.service.impl;

import com.ets.gti525.dao.CredentialDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.service.AuthenticationAPIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AuthenticationAPIServiceImpl implements AuthenticationAPIService{

    @Autowired
    CredentialDAO credentialDAO;

    @Override
    public String authenticateUser(HttpServletRequest httpServletRequest, @RequestBody Credential credential) {
        Credential dbCredential = credentialDAO.findByUsername(credential.getUsername());

        if (dbCredential == null) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        if (!dbCredential.getPassword().equals(credential.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(credential.getUsername(), credential.getPassword(), AuthorityUtils.createAuthorityList(credential.getRole())));

        httpServletRequest.getSession(true).setAttribute("USER_CONTEXT", SecurityContextHolder.getContext());

        return "{\"username\" : \"" + credential.getUsername() + "\"}";
    }
    
    @Override
    public Boolean check(HttpServletRequest httpServletRequest){
        SecurityContextImpl context = (SecurityContextImpl)httpServletRequest.getSession().getAttribute("USER_CONTEXT");
        if (context == null) {
        	throw new IllegalArgumentException("User not authorized.");
        }

        
        return true;
    }
}
