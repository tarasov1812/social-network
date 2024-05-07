package com.social.back.business.repository;

import com.social.back.business.model.session.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository {
    Session save(Session session);
}
