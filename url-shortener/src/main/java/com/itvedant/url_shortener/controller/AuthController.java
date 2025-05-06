package com.itvedant.url_shortener.controller;

import com.itvedant.url_shortener.dto.LoginUserDto;
import com.itvedant.url_shortener.dto.RegisterUserDto;
import com.itvedant.url_shortener.dto.UrlMappingDto;
import com.itvedant.url_shortener.entities.User;
import com.itvedant.url_shortener.security.JwtAuthenticationResponse;
import com.itvedant.url_shortener.service.UrlMappingService;
import com.itvedant.url_shortener.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    UrlMappingService urlMappingService;
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto userDto){
        return ResponseEntity.ok(this.userService.registerUser(userDto));
    }


    @PostMapping("/login")
    //@PreAuthorize("hasRole('USER')")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody LoginUserDto loginUserDto){
        return ResponseEntity.ok(this.userService.loginUser(loginUserDto));
    }

    @GetMapping("/myurls")
    //@PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDto>> getUserUrls(Principal principal){
        User user = userService.findByUserName(principal.getName());
        List<UrlMappingDto> urls = urlMappingService.getUrlByUser(user);
        return ResponseEntity.ok(urls);
    }
}
