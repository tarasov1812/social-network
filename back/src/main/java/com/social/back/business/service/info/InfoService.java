package com.social.back.business.service.info;

import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public interface InfoService {
    Map<String, Object> getInfo();
}

