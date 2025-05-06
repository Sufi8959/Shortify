package com.itvedant.url_shortener.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class UrlMappingDto {

    private Long id;
    private String longUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDateTime dateTime;
    private String username;
}
