package com.social.back.adapter.repository.subscription;

import com.social.back.adapter.repository.author.AuthorEntity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "subscriptions")
public class SubscriptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subscriber_id", referencedColumnName = "id")
    private AuthorEntity subscriberId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_id", referencedColumnName = "id")
    private AuthorEntity targetId;

    @Column(name = "subscription_date")
    private Date subscriptionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuthorEntity getSubscriberId() {
        return subscriberId;
    }

    public void setSubscriberId(AuthorEntity subscriberId) {
        this.subscriberId = subscriberId;
    }

    public AuthorEntity getTargetId() {
        return targetId;
    }

    public void setTargetId(AuthorEntity targetId) {
        this.targetId = targetId;
    }

    public Date getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(Date subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }
}
