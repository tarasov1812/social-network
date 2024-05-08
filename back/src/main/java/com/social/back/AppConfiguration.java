package com.social.back;
import com.social.back.business.repository.AuthorRepository;
import com.social.back.business.repository.PostRepository;
import com.social.back.business.repository.SessionRepository;
import com.social.back.business.repository.SubscriptionRepository;
import com.social.back.business.service.author.StandardAuthorManager;
import com.social.back.business.service.info.FeedService;
import com.social.back.business.service.post.StandardPostManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {
    @Bean
    StandardAuthorManager standardAuthorManager(AuthorRepository authorRepository) {
        return new StandardAuthorManager(authorRepository);
    }

    @Bean
    StandardPostManager standardPostManager(PostRepository postRepository) {
        return new StandardPostManager(postRepository);
    }

    @Bean
    public FeedService feedService(AuthorRepository authorRepository, SessionRepository sessionRepository, PostRepository postRepository, SubscriptionRepository subscriptionRepository) {
        return new FeedService(authorRepository, sessionRepository, postRepository, subscriptionRepository);
    }
}
