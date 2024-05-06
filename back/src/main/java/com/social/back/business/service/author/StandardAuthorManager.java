package com.social.back.business.service.author;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.author.AuthorResult;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.repository.AuthorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

public class StandardAuthorManager implements AuthorManager{
    private static final Logger LOGGER = LoggerFactory.getLogger(StandardAuthorManager.class);

    private AuthorRepository authorManager;

    public StandardAuthorManager(AuthorRepository authorManager) {
        this.authorManager = authorManager;
    }

    public List<Author> findAuthors(AuthorFilter filter, PageableFilter pageable) {
        return (List<Author>) authorManager.findAll(filter, pageable);
    }

    public Author findAuthorById(Long id) {
        Optional<Author> authorOptional = authorManager.findById(id);
        return authorOptional.orElse(null);
    }

    public AuthorResult createAuthor(Author author) {
        AuthorResult authorResult = new AuthorResult();
        Author savedPost = authorManager.save(author);
        authorResult.setMessage("author created successfully");
        authorResult.setStatus("OK");
        authorResult.setId(savedPost.getId());
        author.setId(savedPost.getId());
        return authorResult;
    }


    public AuthorResult deleteAuthor(Long id) {
        AuthorResult authorResult = new AuthorResult();
        Optional<Author> authorOptional = authorManager.findById(id);
        if (authorOptional.isPresent()) {
            LOGGER.info("Delete author: {}", authorOptional);
            authorManager.deleteById(id);
            authorResult.setMessage("author deleted successfully");
            authorResult.setStatus("OK");
            authorResult.setId(authorOptional.get().getId());
        } else {
            authorResult.setMessage("can not delete author");
            authorResult.setStatus("KO");
            authorResult.setId(authorOptional.get().getId());
        }
        return authorResult;
    }

    public AuthorResult updateAuthor(Long id, Author author) {
        AuthorResult authorResult = new AuthorResult();
        LOGGER.info("Saving author: {}", author);
        authorManager.findById(id)
                .map(authorFounded -> {
                    authorFounded.setId(id);
                    authorFounded.setNickName(author.getNickName());
                    authorFounded.setLocation(author.getLocation());
                    authorManager.save(authorFounded);
                    authorResult.setMessage("author updated successfully");
                    authorResult.setStatus("OK");
                    authorResult.setId(authorFounded.getId());
                    return authorResult;
                });
        return authorResult;
    };
}
