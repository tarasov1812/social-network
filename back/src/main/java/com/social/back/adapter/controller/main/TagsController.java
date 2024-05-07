package com.social.back.adapter.controller.main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
public class TagsController {
    @GetMapping("/api/tags")
    public Map<String, List<Map<String, Object>>> getTags() {
        List<Map<String, Object>> tags = new ArrayList<>();

        Map<String, Object> tag1 = new HashMap<>();
        tag1.put("key", 1);
        tag1.put("tag", "#javascript");
        tag1.put("messages", "2 941 messages");
        tags.add(tag1);

        Map<String, Object> tag2 = new HashMap<>();
        tag2.put("key", 2);
        tag2.put("tag", "#python3");
        tag2.put("messages", "29 718 messages");
        tags.add(tag2);

        Map<String, Object> tag3 = new HashMap<>();
        tag3.put("key", 3);
        tag3.put("tag", "#ruby");
        tag3.put("messages", "958 messages");
        tags.add(tag3);

        Map<String, Object> tag4 = new HashMap<>();
        tag4.put("key", 4);
        tag4.put("tag", "#how_to_start_programming");
        tag4.put("messages", "4 185 messages");
        tags.add(tag4);

        Map<String, Object> tag5 = new HashMap<>();
        tag5.put("key", 5);
        tag5.put("tag", "#help_me_with_my_code");
        tag5.put("messages", "482 messages");
        tags.add(tag5);

        Map<String, List<Map<String, Object>>> response = new HashMap<>();
        response.put("tags", tags);

        return response;
    }
}

