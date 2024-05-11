package com.social.back.adapter.repository.author;

import com.social.back.adapter.repository.subscription.StandardSubscriptionRepository;
import com.social.back.adapter.repository.subscription.SubscriptionEntity;
import com.social.back.business.exception.EmailAlreadyExistsException;
import com.social.back.business.exception.NicknameAlreadyExistsException;
import com.social.back.business.exception.NicknameAndEmailAlreadyExistsException;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.repository.AuthorRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AdapterAuthorRepository implements AuthorRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdapterAuthorRepository.class);
    private StandardAuthorRepository repository;
    private StandardSubscriptionRepository subscriptionRepository;
    private ModelMapper modelMapper;
    public AdapterAuthorRepository(StandardAuthorRepository repository, StandardSubscriptionRepository subscriptionRepository) {
        this.repository = repository;
        this.subscriptionRepository = subscriptionRepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public List<Author> findAll(AuthorFilter filter, PageableFilter pageableFilter) {
        Pageable pageable = PageRequest.of(pageableFilter.getQueryIndex(), pageableFilter.getQuerySize());
        Iterable<AuthorEntity> entities = repository.findAll();
        List<Author> authors = new ArrayList<>();
        for (AuthorEntity entity : entities) {
            authors.add(modelMapper.map(entity, Author.class));
        }
        return authors;
    }

    @Override
    public Optional<Author> findById(Long id) {
        return repository.findById(id).map(entity -> modelMapper.map(entity, Author.class));
    }

    @Override
    public Author save(Author author) {
        if (repository.existsByNickName(author.getNickName()) && repository.existsByEmail(author.getEmail())) {
            throw new NicknameAndEmailAlreadyExistsException("Nickname already exists");
        }

        if (repository.existsByNickName(author.getNickName())) {
            throw new NicknameAlreadyExistsException("Nickname already exists");
        }

        if (repository.existsByEmail(author.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        AuthorEntity entity = modelMapper.map(author, AuthorEntity.class);
        AuthorEntity savedEntity = repository.save(entity);
        return modelMapper.map(savedEntity, Author.class);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Author findByEmail(String email) {
        AuthorEntity entity = repository.findByEmail(email);
        return modelMapper.map(entity, Author.class);
    }

    @Override
    public Author uploadCV(Author author) {
        AuthorEntity entity = repository.findByEmail(author.getEmail());
        entity.setCv(author.getCv());
        repository.save(entity);
        return author;
    }
    public List<Author> findSubscribers(Author author) {
        AuthorEntity authorEntity = modelMapper.map(author, AuthorEntity.class);
        List<SubscriptionEntity> subscriptions = subscriptionRepository.findAllByTargetId(authorEntity);
        List<AuthorEntity> targetAuthors = new ArrayList<>();
        for (SubscriptionEntity subscription : subscriptions) {
            targetAuthors.add(subscription.getSubscriberId());
        }
        List<Author> authors = new ArrayList<>();
        for (AuthorEntity entity : targetAuthors) {
            authors.add(modelMapper.map(entity, Author.class));
        }
        return authors;
    }

    public List<Author> findSubscribed(Author author) {
        AuthorEntity authorEntity = modelMapper.map(author, AuthorEntity.class);
        List<SubscriptionEntity> subscriptions = subscriptionRepository.findAllTargetId_BySubscriberId(authorEntity);
        List<AuthorEntity> targetAuthors = new ArrayList<>();
        for (SubscriptionEntity subscription : subscriptions) {
            targetAuthors.add(subscription.getTargetId());
        }
        List<Author> authors = new ArrayList<>();
        for (AuthorEntity entity : targetAuthors) {
            authors.add(modelMapper.map(entity, Author.class));
        }
        return authors;
    }
}
