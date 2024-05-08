package com.social.back.business.model.subscription;

import com.social.back.business.model.author.Author;


import java.util.Date;

public class Subscription {
    private Long id;
    private Author subscriberId;

    private Author targetId;

    private Date subscriptionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Author getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(Author subscriberId) {
        this.subscriberId = subscriberId;
    }

    public Author getTargetId() {
        return targetId;
    }

    public void setTargetId(Author targetId) {
        this.targetId = targetId;
    }

    public Date getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(Date subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }

    public Subscription(Author subscriberId, Author targetId, Date subscriptionDate) {
        this.subscriberId = subscriberId;
        this.targetId = targetId;
        this.subscriptionDate = subscriptionDate;
    }

    public Subscription() {
    }
}
