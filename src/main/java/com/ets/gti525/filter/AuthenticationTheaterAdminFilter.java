package com.ets.gti525.filter;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthenticationTheaterAdminFilter implements Filter {

    //Theater admin token key = 87b8c7ea-2dfb-4402-98e9-d20995a18ec5

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse  httpServletResponse = (HttpServletResponse) servletResponse;

        if (httpServletRequest.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String tokenKey = httpServletRequest.getHeader("API-TOKEN");

        if (tokenKey == null || !tokenKey.equals("87b8c7ea-2dfb-4402-98e9-d20995a18ec5")) {
                httpServletResponse.sendError(404, "NOT AUTHORIZED");
                return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
