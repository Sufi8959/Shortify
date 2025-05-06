package com.itvedant.url_shortener.controller;

import com.itvedant.url_shortener.dto.ClickEventDTO;
import com.itvedant.url_shortener.dto.UrlMappingDto;
import com.itvedant.url_shortener.entities.User;
import com.itvedant.url_shortener.service.UrlMappingService;
import com.itvedant.url_shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.DateFormatter;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping("/api/url")
public class UrlMappingController {

    @Autowired
    UrlMappingService urlMappingService;

    @Autowired
    UserService userService;
    @PostMapping("/shorten")
    public ResponseEntity<UrlMappingDto> createShortUrl(@RequestBody Map<String, String> request, Principal principal){

        String originalUrl = request.get("originalUrl");
        if (principal == null || principal.getName() == null) {
            throw new RuntimeException("User not authenticated.");
        }

        User user = userService.findByUserName(principal.getName());

        if (user == null) {
            throw new RuntimeException("User not found in database.");
        }
        UrlMappingDto urlMappingDto = urlMappingService.generateUrl(originalUrl, user);
        return  ResponseEntity.ok(urlMappingDto);
    }

    @GetMapping("/myurls")
    public ResponseEntity<List<UrlMappingDto>> getAllUrls(Principal principal){
        User user = userService.findByUserName(principal.getName());
        List<UrlMappingDto> urls = urlMappingService.getUrlByUser(user);
        return ResponseEntity.ok(urls);

    }
    @GetMapping("/analytics/{shortUrl}")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventByDate(shortUrl, start, end );
        return ResponseEntity.ok(clickEventDTOS);
    }

    @GetMapping("/totalClicks")
    //@PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClickByDate(Principal principal,
                                                                    @RequestParam("startDate") String startDate,
                                                                    @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE  ;
        User user = userService.findByUserName(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        Map<LocalDate, Long> totalCLicks =  urlMappingService.getTotalClicksByUserAndSpecificDate(user, start, end);
        return ResponseEntity.ok(totalCLicks);
    }
}
