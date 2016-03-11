package com.ets.gti525.service.impl;

import com.ets.gti525.dao.CredentialDAO;
import com.ets.gti525.model.Credential;
import com.ets.gti525.service.AuthenticationAPIService;
import com.sun.javaws.exceptions.InvalidArgumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.util.Collection;

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
                new UsernamePasswordAuthenticationToken(credential.getUsername(), credential.getPassword(), AuthorityUtils.createAuthorityList("ADMIN")));

        httpServletRequest.getSession(true).setAttribute("USER_CONTEXT", SecurityContextHolder.getContext());

        return credential.getUsername();
    }
}
