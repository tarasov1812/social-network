package com.social.back.business.repository;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.session.Session;

public interface SessionRepository {
    Session save(Session session);
    Session findByAuthorAndToken(Author author, String token);
}
