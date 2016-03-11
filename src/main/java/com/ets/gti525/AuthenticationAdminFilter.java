package com.ets.gti525;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextImpl;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthenticationAdminFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        SecurityContextImpl context = (SecurityContextImpl)httpServletRequest.getSession().getAttribute("USER_CONTEXT");
        if (context == null) {
           httpServletResponse.sendError(404, "NOT AUTHORIZED");
            return;
        }

        for (GrantedAuthority grantedAuthority : context.getAuthentication().getAuthorities()) {
            if (!grantedAuthority.getAuthority().equals("ADMIN")) {
                httpServletResponse.sendError(404, "NOT AUTHORIZED");
                return;
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
