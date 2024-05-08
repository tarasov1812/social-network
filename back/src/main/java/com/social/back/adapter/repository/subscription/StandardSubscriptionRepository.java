package com.social.back.adapter.repository.subscription;

import com.social.back.adapter.repository.author.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StandardSubscriptionRepository  extends JpaRepository<SubscriptionEntity, Long> {
    long countByTargetId(AuthorEntity entity);

    long countBySubscriberId(AuthorEntity entity);
}
