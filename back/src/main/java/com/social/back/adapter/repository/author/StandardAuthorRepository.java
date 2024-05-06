package com.social.back.adapter.repository.author;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StandardAuthorRepository extends CrudRepository<AuthorEntity, Long>, PagingAndSortingRepository<AuthorEntity,Long> {
    boolean existsByNickName(String nickName);
    boolean existsByEmail(String email);
}
