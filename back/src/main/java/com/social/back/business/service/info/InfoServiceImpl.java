package com.social.back.business.service.info;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

@Service
public class InfoServiceImpl implements InfoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Map<String, Object> getInfo() {
        Map<String, Object> info = new HashMap<>();
        try {
            // Queries to Data Base
            String usersQuery = "SELECT COUNT(*) AS usersCount FROM authors";
            String messagesQuery = "SELECT COUNT(*) AS messagesCount FROM posts";
            String today = java.time.LocalDate.now().toString(); // Today's date
            String messagesTodayQuery = "SELECT COUNT(*) AS messagesTodayCount FROM posts WHERE DATE(post_date) = ?";

            // Execute SQL queries
            Integer usersCount = jdbcTemplate.queryForObject(usersQuery, Integer.class);
            Integer messagesCount = jdbcTemplate.queryForObject(messagesQuery, Integer.class);
            Integer messagesTodayCount = jdbcTemplate.queryForObject(messagesTodayQuery, Integer.class, today);

            info.put("usersCount", usersCount);
            info.put("messagesCount", messagesCount);
            info.put("messagesTodayCount", messagesTodayCount);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error getting info from database");
        }
        return info;
    }
}

