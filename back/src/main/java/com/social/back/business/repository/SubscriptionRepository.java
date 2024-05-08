package com.social.back.business.repository;
import com.social.back.business.model.author.Author;

public interface SubscriptionRepository {
    long countByTargetId(Author author);

    long countBySubscriberId(Author author);
}
