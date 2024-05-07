package com.social.back.business.service.info;

import com.social.back.adapter.controller.author.JsonAuthor;
import com.social.back.adapter.controller.post.JsonPost;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.session.Session;
import com.social.back.business.repository.AuthorRepository;
import com.social.back.business.repository.PostRepository;
import com.social.back.business.repository.SessionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FeedService {
    private ModelMapper modelMapper = new ModelMapper();

    private final AuthorRepository authorRepository;
    private final SessionRepository sessionRepository;
    private final PostRepository postRepository;

    public FeedService(AuthorRepository authorRepository, SessionRepository sessionRepository, PostRepository postRepository) {
        this.authorRepository = authorRepository;
        this.sessionRepository = sessionRepository;
        this.postRepository = postRepository;
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

        List<Post> posts = postRepository.findPostsByAuthorIdOrSubscribedAuthors(author.getId());
        List<JsonPost>  jsonPosts = posts.stream()
                .map(post -> modelMapper.map(post, JsonPost.class))
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("userDetails", jsonAuthor);
        response.put("posts", jsonPosts);

        return ResponseEntity.ok(response);
    }
}
