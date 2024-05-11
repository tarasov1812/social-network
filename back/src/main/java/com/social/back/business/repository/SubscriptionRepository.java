package com.social.back.business.repository;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.subscription.Subscription;

import java.util.List;

public interface SubscriptionRepository {
    long countByTargetId(Author author);

    long countBySubscriberId(Author author);

    void save(Subscription subscription);

    void delete(Subscription subscription);

    Subscription findBySubscriberIdAndTargetId(Author cUser, Author aUser);
}
