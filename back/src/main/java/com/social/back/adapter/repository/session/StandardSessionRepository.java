package com.social.back.adapter.repository.session;

import com.social.back.adapter.repository.author.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StandardSessionRepository extends JpaRepository<SessionEntity, Long> {
    SessionEntity findByAuthorAndToken(AuthorEntity author, String token);
}
