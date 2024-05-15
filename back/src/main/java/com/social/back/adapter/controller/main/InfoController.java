package com.social.back.adapter.controller.main;

import com.social.back.business.service.info.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin
public class InfoController {

    @Autowired
    private InfoService infoService;

    @GetMapping("/api/getInfo")
    public Map<String, Object> getInfo() {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> info = infoService.getInfo();
            response.put("usersCount", info.get("usersCount"));
            response.put("messagesCount", info.get("messagesCount"));
            response.put("messagesTodayCount", info.get("messagesTodayCount"));
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Server Error");
        }
        return response;
    }
}

