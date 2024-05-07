package com.social.back.adapter.controller.main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
public class ChannelsController {

    @GetMapping("/api/channels")
    public Map<String, List<Map<String, Object>>> getChannels() {
        List<Map<String, Object>> channels = new ArrayList<>();

        Map<String, Object> channel1 = new HashMap<>();
        channel1.put("id", 1);
        channel1.put("channelName", "Oracle");
        channel1.put("channelNick", "@oracle");
        channel1.put("img", "https://ucarecdn.com/f19da68b-7116-4d4a-ab8f-0f2f7df2fa60/oracle.jpg");
        channels.add(channel1);

        Map<String, Object> channel2 = new HashMap<>();
        channel2.put("id", 2);
        channel2.put("channelName", "Accenture");
        channel2.put("channelNick", "@accenture");
        channel2.put("img", "https://ucarecdn.com/faaffe5b-60aa-4a70-b86e-db0ccc9c5c3d/accenture.png");
        channels.add(channel2);

        Map<String, Object> channel3 = new HashMap<>();
        channel3.put("id", 3);
        channel3.put("channelName", "Google");
        channel3.put("channelNick", "@google");
        channel3.put("img", "https://ucarecdn.com/53365773-5c92-4b81-bf2d-eca12c924332/google.png");
        channels.add(channel3);

        Map<String, List<Map<String, Object>>> response = new HashMap<>();
        response.put("channels", channels);

        return response;
    }
}
