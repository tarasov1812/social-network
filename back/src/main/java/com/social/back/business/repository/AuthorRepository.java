package com.social.back.business.repository;

import com.social.back.adapter.repository.author.AuthorEntity;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.common.PageableFilter;

import java.util.List;
import java.util.Optional;

public interface AuthorRepository {
    List<Author> findAll(AuthorFilter filter, PageableFilter pageableFilter);

    Optional<Author> findById(Long id);

    Author save(Author post);

    void deleteById(Long id);

    Author findByEmail(String email);

    Author uploadCV(Author author);
}
