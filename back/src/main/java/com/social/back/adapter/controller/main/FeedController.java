package com.social.back.adapter.controller.main;

import com.social.back.business.service.info.FeedService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FeedController {

    private final FeedService feedService;

    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(@CookieValue(value = "email", required = false) String email,
                                     @CookieValue(value = "token", required = false) String token,
                                     HttpServletResponse response) {
        if (email == null || token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return feedService.getFeed(email, token);
    }
    @GetMapping("/get-user-details/{id}/{currentUserId}")
    public ResponseEntity<?> getAnotherUser(@PathVariable Long id, @PathVariable Long currentUserId) {

        return feedService.getAnotherUser(id, currentUserId);
    }
}

