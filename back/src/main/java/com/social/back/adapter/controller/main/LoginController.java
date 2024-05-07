package com.social.back.adapter.controller.main;

import com.social.back.adapter.reqests.LoginRequest;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.session.Session;
import com.social.back.business.repository.AuthorRepository;
import com.social.back.business.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.UUID;

@RestController
public class LoginController {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Author author = authorRepository.findByEmail(loginRequest.getEmail());
        if (author != null) {
            if (loginRequest.getPassword().equals(author.getPassword())) {
                // Generate token
                String token = UUID.randomUUID().toString();

                // Create session
                Session session = new Session();
                session.setAuthor(author);
                session.setToken(token);
                sessionRepository.save(session);

                // Save token in cookie
                Cookie emailCookie = new Cookie("email", loginRequest.getEmail());
                Cookie tokenCookie = new Cookie("token", token);
                emailCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
                tokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
                response.addCookie(emailCookie);
                response.addCookie(tokenCookie);

                return ResponseEntity.status(HttpStatus.OK).body("Successful login");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is not correct");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doesn't exist");
        }
    }
}

