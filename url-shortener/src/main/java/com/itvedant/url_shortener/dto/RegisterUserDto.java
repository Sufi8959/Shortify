package com.itvedant.url_shortener.dto;

import com.itvedant.url_shortener.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class RegisterUserDto {
    private String username;
    private String email;
    private String role;
    private String password;
}
