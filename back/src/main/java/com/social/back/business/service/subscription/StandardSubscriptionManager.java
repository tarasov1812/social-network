package com.social.back.business.service.subscription;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.subscription.Subscription;
import com.social.back.business.model.subscription.SubscriptionResult;
import com.social.back.business.repository.AuthorRepository;
import com.social.back.business.repository.SubscriptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

public class StandardSubscriptionManager implements SubscriptionManager{
    private static final Logger LOGGER = LoggerFactory.getLogger(StandardSubscriptionManager.class);
    private SubscriptionRepository subscriptionRepository;
    private AuthorRepository authorRepository;

    public StandardSubscriptionManager(SubscriptionRepository subscriptionRepository, AuthorRepository authorRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.authorRepository = authorRepository;
    }

    public SubscriptionResult subscribeToAuthor(Long subscriberId, Long subscribedToId) {
        Optional<Author> currentUser = authorRepository.findById(subscriberId);
        Author cUser = currentUser.orElse(null);
        Optional<Author> anotherUser = authorRepository.findById(subscribedToId);
        Author aUser = anotherUser.orElse(null);
        Date now = new Date();

        Subscription subscription = new Subscription(cUser, aUser, now);
        subscriptionRepository.save(subscription);

        SubscriptionResult subscriptionResult = new SubscriptionResult();
        subscriptionResult.setMessage("Subscription successful");
        subscriptionResult.setId(cUser.getId());
        subscriptionResult.setStatus("OK");
        return subscriptionResult;
    }

    public SubscriptionResult unsubscribeFromAuthor(Long subscriberId, Long subscribedToId) {
        Optional<Author> currentUser = authorRepository.findById(subscriberId);
        Author cUser = currentUser.orElse(null);
        Optional<Author> anotherUser = authorRepository.findById(subscribedToId);
        Author aUser = anotherUser.orElse(null);
        Subscription subscription = subscriptionRepository.findBySubscriberIdAndTargetId(cUser, aUser);

        subscriptionRepository.delete(subscription);
        SubscriptionResult subscriptionResult = new SubscriptionResult();
        subscriptionResult.setMessage("Unsubscription successful");
        subscriptionResult.setId(cUser.getId());
        subscriptionResult.setStatus("OK");
        return subscriptionResult;
    }
}
