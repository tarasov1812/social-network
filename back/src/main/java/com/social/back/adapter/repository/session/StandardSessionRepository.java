package com.social.back.adapter.repository.session;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StandardSessionRepository extends JpaRepository<SessionEntity, Long> {
}
