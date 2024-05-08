package com.social.back.business.service.subscription;

import com.social.back.business.model.subscription.SubscriptionResult;

public interface SubscriptionManager {
    public SubscriptionResult subscribeToAuthor(Long subscriberId, Long subscribedToId);
    public SubscriptionResult unsubscribeFromAuthor(Long subscriberId, Long subscribedToId);
}
