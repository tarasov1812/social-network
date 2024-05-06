package com.social.back.adapter.repository.post;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StandardPostRepository extends CrudRepository<PostEntity, Long>, PagingAndSortingRepository<PostEntity,Long>  {
}
