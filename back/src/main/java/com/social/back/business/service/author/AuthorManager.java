package com.social.back.business.service.author;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.author.AuthorResult;
import com.social.back.business.model.common.PageableFilter;

import java.util.List;

public interface AuthorManager {
    public Author findAuthorById(Long id);
    public AuthorResult createAuthor(Author author);
    public AuthorResult deleteAuthor(Long id);
    public AuthorResult updateAuthor(Long id, Author author);
    List<Author> findAuthors(AuthorFilter filter, PageableFilter pageableFilter);
}
