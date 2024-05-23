package com.social.back.adapter.controller.main;

import com.social.back.adapter.controller.author.AuthorController;
import com.social.back.adapter.controller.common.AppErrorResponse;
import com.social.back.business.service.info.FeedService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class FeedController {

    private final FeedService feedService;

    private static final Logger LOGGER = LoggerFactory.getLogger(FeedController.class);
    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getFeed(@CookieValue(value = "email", required = false) String email,
                                     @CookieValue(value = "token", required = false) String token,
                                     HttpServletResponse response) {
        if (email == null || token == null) {
            AppErrorResponse error = new AppErrorResponse();
            error.setStatus("UNAUTHORIZED");
            ResponseEntity<?> res = new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
            return res;
        }

        try {
            return feedService.getFeed(email, token);
        } catch (Exception e) {
            AppErrorResponse error = new AppErrorResponse();
            error.setStatus("UNAUTHORIZED");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-user-details/{id}/{currentUserId}")
    public ResponseEntity<?> getAnotherUser(@PathVariable Long id, @PathVariable Long currentUserId) {

        return feedService.getAnotherUser(id, currentUserId);
    }
}

