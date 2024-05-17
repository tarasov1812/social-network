package com.social.back.adapter.controller.subscription;

import com.fasterxml.jackson.annotation.JsonView;
import com.social.back.adapter.controller.author.JsonAuthorViews;

import java.util.Date;

public class JsonSubscription {
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonSubscriptionViews.BasicDataResponse.class, JsonSubscriptionViews.BasicDataResponse.class})
    private Long id;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonSubscriptionViews.BasicDataResponse.class, JsonSubscriptionViews.BasicDataResponse.class})
    private Long subscriberId;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonSubscriptionViews.BasicDataResponse.class, JsonSubscriptionViews.BasicDataResponse.class})
    private Long targetId;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonSubscriptionViews.BasicDataResponse.class, JsonSubscriptionViews.BasicDataResponse.class})
    private Date subscriptionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(Long subscriberId) {
        this.subscriberId = subscriberId;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Date getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(Date subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }
}
