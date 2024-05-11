package com.social.back.business.service.info;

import com.social.back.adapter.controller.author.JsonAuthor;
import com.social.back.adapter.controller.post.JsonPost;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.session.Session;
import com.social.back.business.model.subscription.Subscription;
import com.social.back.business.repository.AuthorRepository;
import com.social.back.business.repository.PostRepository;
import com.social.back.business.repository.SessionRepository;
import com.social.back.business.repository.SubscriptionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class FeedService {
    private ModelMapper modelMapper = new ModelMapper();

    private final AuthorRepository authorRepository;
    private final SessionRepository sessionRepository;
    private final PostRepository postRepository;
    private final SubscriptionRepository subscriptionRepository;

    public FeedService(AuthorRepository authorRepository, SessionRepository sessionRepository, PostRepository postRepository, SubscriptionRepository subscriptionRepository) {
        this.authorRepository = authorRepository;
        this.sessionRepository = sessionRepository;
        this.postRepository = postRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    public ResponseEntity<?> getFeed(String email, String token) {
        Author author = authorRepository.findByEmail(email);
        JsonAuthor jsonAuthor = this.modelMapper.map(author, JsonAuthor.class);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Session session = sessionRepository.findByAuthorAndToken(author, token);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session finished");
        }

        long followersCount = subscriptionRepository.countByTargetId(author);
        long subscriptionsCount = subscriptionRepository.countBySubscriberId(author);
        long postsCount = postRepository.countByAuthorId(author.getId());
        jsonAuthor.setFollowersCount(followersCount);
        jsonAuthor.setFollowingCount(subscriptionsCount);
        jsonAuthor.setPostCount(postsCount);

        List<Post> posts = postRepository.findPostsByAuthorIdOrSubscribedAuthors(author.getId());
        List<JsonPost>  jsonPosts = posts.stream()
                .map(post -> modelMapper.map(post, JsonPost.class))
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("userDetails", jsonAuthor);
        response.put("posts", jsonPosts);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAnotherUser(Long id, Long currentUserId) {
        Optional<Author> anotherUser = authorRepository.findById(id);
        Author aUser = anotherUser.orElse(null);
        Optional<Author> currentUser = authorRepository.findById(currentUserId);
        Author cUser = currentUser.orElse(null);
        JsonAuthor jsonAuthor = this.modelMapper.map(aUser, JsonAuthor.class);

        long followersCount = subscriptionRepository.countByTargetId(aUser);
        long subscriptionsCount = subscriptionRepository.countBySubscriberId(aUser);
        long postsCount = postRepository.countByAuthorId(aUser.getId());
        Subscription sub = subscriptionRepository.findBySubscriberIdAndTargetId(cUser,aUser);
        boolean isSubscribed = false;
        // todo - rewrite it in more optimal way
        if (sub != null && sub.getId() != null) {
            isSubscribed = true;
        }
        jsonAuthor.setFollowersCount(followersCount);
        jsonAuthor.setFollowingCount(subscriptionsCount);
        jsonAuthor.setPostCount(postsCount);
        jsonAuthor.setSubscribed(isSubscribed);

        List<Post> posts = postRepository.findAllByAuthor(aUser);
        List<JsonPost>  jsonPosts = posts.stream()
                .map(post -> modelMapper.map(post, JsonPost.class))
                .collect(Collectors.toList());
        // todo - optimize this code to do lees request to database
        List<Author> subscribers = authorRepository.findSubscribers(aUser);
        List<JsonAuthor> jsonSubscribers = subscribers.stream()
                .map(subscriber -> modelMapper.map(subscriber, JsonAuthor.class))
                .collect(Collectors.toList());
        List<Author> subscribed = authorRepository.findSubscribed(aUser);
        List<JsonAuthor> jsonSubscribed = subscribed.stream()
                .map(subd -> modelMapper.map(subd, JsonAuthor.class))
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("userInfo", jsonAuthor);
        response.put("posts", jsonPosts);
        response.put("subscribers", jsonSubscribers);
        response.put("subscribed", jsonSubscribed);

        return ResponseEntity.ok(response);
    }
}
