package com.itvedant.url_shortener.repository;

import com.itvedant.url_shortener.entities.UrlMapping;
import com.itvedant.url_shortener.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping , Long> {
//    Optional<User> findByUsername(String username);
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);
}
