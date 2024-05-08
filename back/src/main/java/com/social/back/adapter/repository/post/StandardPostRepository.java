package com.social.back.adapter.repository.post;

import com.social.back.business.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface StandardPostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByAuthorIdOrAuthorIdIn(Long authorId, List<Long> subscribedAuthorIds);

    int countByAuthorId(Long id);
}
