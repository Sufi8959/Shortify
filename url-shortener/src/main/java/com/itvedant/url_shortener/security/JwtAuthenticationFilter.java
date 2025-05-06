package com.itvedant.url_shortener.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtils tokenProviderMethods;

    @Autowired
    private UserDetailsService myUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
        String jwt = tokenProviderMethods.getJwtHeader(request);

        if(jwt != null && tokenProviderMethods.validateToken(jwt)){
            String username = tokenProviderMethods.getUserNameFromJwtToken(jwt);
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
            if(userDetails != null){
                UsernamePasswordAuthenticationToken UPAToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                UPAToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(UPAToken);

            }
        }
        }catch(Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());

        }

        filterChain.doFilter(request,response);
    }
}
