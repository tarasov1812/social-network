package com.social.back.adapter.repository.subscription;

import com.social.back.adapter.repository.author.AuthorEntity;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.subscription.Subscription;
import com.social.back.business.repository.SubscriptionRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AdapterSubscriptionRepository implements SubscriptionRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdapterSubscriptionRepository.class);
    private StandardSubscriptionRepository repository;
    private ModelMapper modelMapper;

    public AdapterSubscriptionRepository(StandardSubscriptionRepository repository) {
        this.repository = repository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public long countByTargetId(Author author) {
        AuthorEntity entity = modelMapper.map(author, AuthorEntity.class);
        return repository.countByTargetId(entity);
    }

    @Override
    public long countBySubscriberId(Author author) {
        AuthorEntity entity = modelMapper.map(author, AuthorEntity.class);
        return repository.countBySubscriberId(entity);
    }

    @Override
    public void save(Subscription subscription) {
        SubscriptionEntity entity = modelMapper.map(subscription, SubscriptionEntity.class);
        repository.save(entity);

    }

    @Override
    public void delete(Subscription subscription) {
        SubscriptionEntity entity = modelMapper.map(subscription, SubscriptionEntity.class);
        repository.delete(entity);
    }

    @Override
    public Subscription findBySubscriberIdAndTargetId(Author cUser, Author aUser) {
        AuthorEntity currentUserEntity = modelMapper.map(cUser, AuthorEntity.class);
        AuthorEntity anothertUserEntity = modelMapper.map(aUser, AuthorEntity.class);
        Optional<SubscriptionEntity> entity = repository.findBySubscriberIdAndTargetId(currentUserEntity, anothertUserEntity);
        SubscriptionEntity sub = entity.orElse(null);
        if (sub == null) {
            return null;
        } else {
            Subscription subscription = modelMapper.map(sub, Subscription.class);
            return subscription;
        }
    }
}
