package com.social.back.business.model.session;

import com.social.back.business.model.author.Author;
import jakarta.persistence.*;

public class Session {
    private Long id;
    private Author author;
    private String token;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
