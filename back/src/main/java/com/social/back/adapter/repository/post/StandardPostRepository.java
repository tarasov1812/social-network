package com.social.back.adapter.repository.post;

import com.social.back.adapter.repository.author.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface StandardPostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByAuthorIdOrAuthorIdIn(Long authorId, List<Long> subscribedAuthorIds);

    int countByAuthorId(Long id);

    List<PostEntity> findAllByAuthor(AuthorEntity author);
}
