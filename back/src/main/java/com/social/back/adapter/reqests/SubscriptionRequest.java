package com.social.back.adapter.reqests;

public class SubscriptionRequest {
    private Long subscriberId;
    private Long subscribedToId;

    public Long getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(Long subscriberId) {
        this.subscriberId = subscriberId;
    }

    public Long getSubscribedToId() {
        return subscribedToId;
    }

    public void setSubscribedToId(Long subscribedToId) {
        this.subscribedToId = subscribedToId;
    }
}
