package com.social.back.business.service.post;

import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.post.PostFilter;
import com.social.back.business.model.post.PostResult;
import com.social.back.business.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

public class StandardPostManager implements PostManager{
    private static final Logger LOGGER = LoggerFactory.getLogger(StandardPostManager.class);

    private PostRepository postRepository;

    public StandardPostManager(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> findPosts(PostFilter filter, PageableFilter pageable) {
        return (List<Post>) postRepository.findAll(filter, pageable);
    }

    public Post findPostById(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        return postOptional.orElse(null);
    }

    public PostResult createPost(Post post) {
        PostResult postResult = new PostResult();
        Post savedPost = postRepository.save(post);
        postResult.setMessage("post created successfully");
        postResult.setStatus("OK");
        postResult.setId(savedPost.getId());
        post.setId(savedPost.getId());
        return postResult;
    }


    public PostResult deletePost(Long id) {
        PostResult postResult = new PostResult();
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            LOGGER.info("Delete post: {}", postOptional);
            postRepository.deleteById(id);
            postResult.setMessage("post deleted successfully");
            postResult.setStatus("OK");
            postResult.setId(postOptional.get().getId());
        } else {
            postResult.setMessage("can not delete post");
            postResult.setStatus("KO");
            postResult.setId(postOptional.get().getId());
        }
        return postResult;
    }

    public PostResult updatePost(Long id, Post post) {
        PostResult postResult = new PostResult();
        LOGGER.info("Saving post: {}", post);
        postRepository.findById(id)
                .map(postFounded -> {
                    postFounded.setId(id);
                    postRepository.save(postFounded);
                    postResult.setMessage("post updated successfully");
                    postResult.setStatus("OK");
                    postResult.setId(postFounded.getId());
                    return postResult;
                });
        return postResult;
    };
}
