package com.social.back.business.repository;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.post.PostFilter;

import java.util.List;
import java.util.Optional;

public interface PostRepository {
    List<Post> findAll(PostFilter filter, PageableFilter pageableFilter);

    Optional<Post> findById(Long id);

    Post save(Post post);

    void deleteById(Long id);

    List<Post> findPostsByAuthorIdOrSubscribedAuthors(Long id);

    int countByAuthorId(Long id);

    List<Post> findAllByAuthor(Author author);
}
