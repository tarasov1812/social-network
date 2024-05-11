package com.social.back.business.service.author;

import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.author.AuthorResult;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.repository.AuthorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public class StandardAuthorManager implements AuthorManager {
    private static final Logger LOGGER = LoggerFactory.getLogger(StandardAuthorManager.class);

    private AuthorRepository authorRepository;

    public StandardAuthorManager(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> findAuthors(AuthorFilter filter, PageableFilter pageable) {
        return (List<Author>) authorRepository.findAll(filter, pageable);
    }

    public Author findAuthorById(Long id) {
        Optional<Author> authorOptional = authorRepository.findById(id);
        return authorOptional.orElse(null);
    }

    public AuthorResult createAuthor(Author author) {
        AuthorResult authorResult = new AuthorResult();
        Author savedAuthor = authorRepository.save(author);
        authorResult.setMessage("author created successfully");
        authorResult.setStatus("OK");
        authorResult.setId(savedAuthor.getId());
        author.setId(savedAuthor.getId());
        return authorResult;
    }


    public AuthorResult deleteAuthor(Long id) {
        AuthorResult authorResult = new AuthorResult();
        Optional<Author> authorOptional = authorRepository.findById(id);
        if (authorOptional.isPresent()) {
            LOGGER.info("Delete author: {}", authorOptional);
            authorRepository.deleteById(id);
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
        authorRepository.findById(id)
                .map(authorFounded -> {
                    authorFounded.setNickName(author.getNickName());
                    authorFounded.setName(author.getName());
                    authorFounded.setAbout(author.getAbout());
                    authorFounded.setStack(author.getStack());
                    authorFounded.setBirthdate(author.getBirthdate());
                    authorFounded.setShowBirthdate(author.isShowBirthdate());
                    authorFounded.setOpenToWork(author.isOpenToWork());
                    authorFounded.setLocation(author.getLocation());
                    authorFounded.setAvatar(author.getAvatar());
                    authorRepository.update(authorFounded);
                    authorResult.setMessage("author updated successfully");
                    authorResult.setStatus("OK");
                    authorResult.setId(authorFounded.getId());
                    return authorResult;
                });
        return authorResult;
    }

    ;

    public AuthorResult uploadCV(Long id, MultipartFile file) {
        AuthorResult authorResult = new AuthorResult();
        Optional<Author> authorOptional = authorRepository.findById(id);
        Author author = authorOptional.orElse(null);
        try {
            byte[] fileBytes = file.getBytes();
            author.setCv(fileBytes);
            Author savedAuthor = authorRepository.uploadCV(author);
            authorResult.setMessage("CV upload success");
            authorResult.setStatus("OK");
            authorResult.setId(authorOptional.get().getId());
            return authorResult;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ByteArrayResource downloadCv(Long id) {
        Optional<Author> optionalAuthor = authorRepository.findById(id);
        Author author = optionalAuthor.orElse(null);
        byte[] pdfData = author.getCv();
        ByteArrayResource resource = new ByteArrayResource(pdfData);
        return resource;
    }

    @Override
    public AuthorResult updateEmail(Long id, String email, String password) {
        AuthorResult authorResult = new AuthorResult();
        Optional<Author> authorOptional = authorRepository.findById(id);
        Author author = authorOptional.orElse(null);
        if (author.getPassword().equals(password)) {
            author.setEmail(email);
            authorRepository.update(author);
            authorResult.setMessage("author updated successfully");
            authorResult.setStatus("OK");
            authorResult.setId(author.getId());
            return authorResult;
        } else {
            authorResult.setMessage("can not delete author");
            authorResult.setStatus("KO");
            authorResult.setId(authorOptional.get().getId());
        }
        return authorResult;
    }

    @Override
    public AuthorResult updatePassword(Long id, String oldPassword, String newPassword) {
        AuthorResult authorResult = new AuthorResult();
        Optional<Author> authorOptional = authorRepository.findById(id);
        Author author = authorOptional.orElse(null);
        if (author.getPassword().equals(oldPassword)) {
            author.setPassword(newPassword);
            authorRepository.update(author);
            authorResult.setMessage("author updated successfully");
            authorResult.setStatus("OK");
            authorResult.setId(author.getId());
            return authorResult;
        } else {
            authorResult.setMessage("can not delete author");
            authorResult.setStatus("KO");
            authorResult.setId(authorOptional.get().getId());
        }
        return authorResult;
    }
}
