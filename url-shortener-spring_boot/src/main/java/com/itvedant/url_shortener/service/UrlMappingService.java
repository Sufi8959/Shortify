package com.itvedant.url_shortener.service;

import com.itvedant.url_shortener.dto.ClickEventDTO;
import com.itvedant.url_shortener.dto.UrlMappingDto;
import com.itvedant.url_shortener.entities.ClickEvent;
import com.itvedant.url_shortener.entities.UrlMapping;
import com.itvedant.url_shortener.entities.User;
import com.itvedant.url_shortener.repository.ClickEventRepository;
import com.itvedant.url_shortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {
    UrlMappingRepository urlMappingRepository;
    ClickEventRepository clickEventRepository;
    public UrlMappingDto generateUrl(String originalUrl, User user){
        String shortUrl = generateShortUrl();

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setLongUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setDateTime(LocalDateTime.now());
        UrlMapping finalUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(finalUrlMapping);
    }
    public UrlMappingDto convertToDto(UrlMapping urlMapping){
        UrlMappingDto urlMappingDto = new UrlMappingDto();
        urlMappingDto.setId(urlMapping.getId());
        urlMappingDto.setLongUrl(urlMapping.getLongUrl());
        urlMappingDto.setShortUrl(urlMapping.getShortUrl());
        urlMappingDto.setDateTime(urlMapping.getDateTime());
        urlMappingDto.setUsername(urlMapping.getUser().getUsername());
        urlMappingDto.setClickCount(urlMapping.getClickCount());
        return urlMappingDto;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for(int i = 0;i<8;i++){
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }

        return  shortUrl.toString();
    }

    public List<UrlMappingDto> getUrlByUser(User user){
        return urlMappingRepository.findByUser(user).stream().map((urlMapping -> convertToDto(urlMapping))).toList();
    }

    public List<ClickEventDTO> getClickEventByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
    UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

    if(urlMapping != null){
        return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream().
                collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting())).entrySet().stream().map(entry->
                        {
                            ClickEventDTO clickEventDTO = new ClickEventDTO();
                            clickEventDTO.setClickDate(entry.getKey());
                            clickEventDTO.setCount(entry.getValue());
                            return  clickEventDTO;
                        }
                        ).collect(Collectors.toList());
    }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndSpecificDate(User user, LocalDate start, LocalDate end) {

        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());

        return clickEvents.stream().collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }

    public UrlMapping getOriginalUrl(String shortUrl){
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        if(urlMapping != null){

            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;


    }
}
