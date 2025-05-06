package com.itvedant.url_shortener.controller;

import com.itvedant.url_shortener.entities.UrlMapping;
import com.itvedant.url_shortener.service.UrlMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectUserController {

    @Autowired
    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl){
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);

        if(urlMapping != null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location", urlMapping.getLongUrl());
            return ResponseEntity.status(302).headers(httpHeaders).build();
        }else{
            return  ResponseEntity.notFound().build();
        }

    }
}
