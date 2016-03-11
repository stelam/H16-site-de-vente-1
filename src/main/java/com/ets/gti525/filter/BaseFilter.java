package com.ets.gti525.filter;

import org.springframework.security.core.context.SecurityContextImpl;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class BaseFilter implements Filter {

    protected SecurityContextImpl context;
    protected HttpServletRequest httpServletRequest;
    protected HttpServletResponse httpServletResponse;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        httpServletRequest = (HttpServletRequest) request;
        httpServletResponse = (HttpServletResponse) response;

        if (httpServletRequest.getMethod().equals("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }

        context = (SecurityContextImpl)httpServletRequest.getSession().getAttribute("USER_CONTEXT");
        if (context == null) {
            httpServletResponse.sendError(403, "NOT AUTHORIZED");
            return;
        }
    }

    @Override
    public void destroy() {

    }
}
