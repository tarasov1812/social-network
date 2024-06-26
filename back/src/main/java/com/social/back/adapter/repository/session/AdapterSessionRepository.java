package com.social.back.adapter.repository.session;

import com.social.back.adapter.repository.author.AuthorEntity;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.session.Session;
import com.social.back.business.repository.SessionRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AdapterSessionRepository implements SessionRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdapterSessionRepository.class);
    private StandardSessionRepository repository;
    private ModelMapper modelMapper;

    public AdapterSessionRepository(StandardSessionRepository repository) {
        this.repository = repository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public Session save(Session session) {
        SessionEntity entity = modelMapper.map(session, SessionEntity.class);
        SessionEntity savedEntity = repository.save(entity);
        return modelMapper.map(savedEntity, Session.class);
    }

    @Override
    public Session findByAuthorAndToken(Author author, String token) {
        AuthorEntity entity = modelMapper.map(author, AuthorEntity.class);
        SessionEntity sessionEntity = repository.findByAuthorAndToken(entity, token);
        return modelMapper.map(sessionEntity, Session.class);
    }
}
