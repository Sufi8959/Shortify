package com.itvedant.url_shortener.service;

import com.itvedant.url_shortener.dto.LoginUserDto;
import com.itvedant.url_shortener.dto.RegisterUserDto;
import com.itvedant.url_shortener.entities.User;
import com.itvedant.url_shortener.repository.UserRepository;
import com.itvedant.url_shortener.security.JwtAuthenticationResponse;
import com.itvedant.url_shortener.security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepo;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterUserDto userDto){
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        this.userRepo.save(user);
        return user;
    }

    public JwtAuthenticationResponse loginUser(LoginUserDto loginUserDto){
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDto.getUsername(), loginUserDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtUtils.generateToken(userDetails);
        return new JwtAuthenticationResponse(token);
    }

    public User findByUserName(String username){
        return  userRepo.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}
