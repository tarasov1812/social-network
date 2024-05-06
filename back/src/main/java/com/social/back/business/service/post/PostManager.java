package com.social.back.business.service.post;

import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.post.PostFilter;
import com.social.back.business.model.post.PostResult;

import java.util.List;

public interface PostManager {
    public Post findPostById(Long id);
    public PostResult createPost(Post post);
    public PostResult deletePost(Long id);
    public PostResult updatePost(Long id, Post post);
    List<Post> findPosts(PostFilter filter, PageableFilter pageableFilter);
}
