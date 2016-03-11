package com.ets.gti525.filter;

import org.springframework.security.core.GrantedAuthority;

import javax.servlet.*;
import java.io.IOException;

public class AuthenticationTheaterAdminFilter extends BaseFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        super.doFilter(servletRequest, servletResponse, filterChain);

        if (httpServletRequest.getMethod().equals("OPTIONS")) {
            return;
        }

        for (GrantedAuthority grantedAuthority : context.getAuthentication().getAuthorities()) {
            if (!grantedAuthority.getAuthority().equals("THEATER_ADMIN") && !grantedAuthority.getAuthority().equals("ADMIN")) {
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
