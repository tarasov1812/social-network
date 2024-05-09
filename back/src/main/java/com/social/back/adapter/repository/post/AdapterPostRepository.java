package com.social.back.adapter.repository.post;

import com.social.back.adapter.repository.author.AuthorEntity;
import com.social.back.adapter.repository.subscription.StandardSubscriptionRepository;
import com.social.back.adapter.repository.subscription.SubscriptionEntity;
import com.social.back.business.exception.EmailAlreadyExistsException;
import com.social.back.business.exception.NicknameAlreadyExistsException;
import com.social.back.business.exception.NicknameAndEmailAlreadyExistsException;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.post.PostFilter;
import com.social.back.business.repository.PostRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class AdapterPostRepository implements PostRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdapterPostRepository.class);
    private StandardPostRepository repository;
    private StandardSubscriptionRepository subscriptionRepository;
    private ModelMapper modelMapper;
    public AdapterPostRepository(StandardPostRepository repository, StandardSubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.repository = repository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public List<Post> findAll(PostFilter filter, PageableFilter pageableFilter) {
        Pageable pageable = PageRequest.of(pageableFilter.getQueryIndex(), pageableFilter.getQuerySize());
        Iterable<PostEntity> entities = repository.findAll();
        List<Post> posts = new ArrayList<>();
        for (PostEntity entity : entities) {
            posts.add(modelMapper.map(entity, Post.class));
        }
        return posts;
    }

    @Override
    public Optional<Post> findById(Long id) {
        return repository.findById(id).map(entity -> modelMapper.map(entity, Post.class));
    }

    @Override
    public Post save(Post post) {
        PostEntity entity = modelMapper.map(post, PostEntity.class);
        PostEntity savedEntity = repository.save(entity);
        return modelMapper.map(savedEntity, Post.class);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Post> findPostsByAuthorIdOrSubscribedAuthors(Long id) {
        List<SubscriptionEntity> subscriptions = subscriptionRepository.findBySubscriberId_Id(id);

        List<Long> subscribedAuthorIds = subscriptions.stream()
                .map(subscription -> subscription.getTargetId().getId())
                .collect(Collectors.toList());

        List<PostEntity> postEntities = repository.findByAuthorIdOrAuthorIdIn(id, subscribedAuthorIds);
        return postEntities.stream()
                .map(postEntity -> modelMapper.map(postEntity, Post.class))
                .collect(Collectors.toList());
    }

    @Override
    public int countByAuthorId(Long id) {
        return repository.countByAuthorId(id);
    }

    @Override
    public List<Post> findAllByAuthor(Author author) {
        AuthorEntity entity = modelMapper.map(author, AuthorEntity.class);
        List<PostEntity> postEntities = repository.findAllByAuthor(entity);
        return postEntities.stream()
                .map(postEntity -> modelMapper.map(postEntity, Post.class))
                .collect(Collectors.toList());
    }
}
