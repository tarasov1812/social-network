package com.social.back.adapter.repository.post;

import com.social.back.adapter.repository.author.AuthorEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "posts")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "author_id", referencedColumnName = "id",  nullable = false)
    private AuthorEntity author;
    @Column(name = "content")
    private String content;
    @Column(name = "post_date")
    private LocalDateTime postDate;
    @Column(name = "repost")
    private Long repost;
    @Column(name = "thumb_up")
    private Long thumbUp;
    @Column(name = "share")
    private Long share;
    @Column(name = "img")
    private String img;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuthorEntity getAuthor() {
        return author;
    }

    public void setAuthor(AuthorEntity author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
        this.postDate = postDate;
    }

    public Long getRepost() {
        return repost;
    }

    public void setRepost(Long repost) {
        this.repost = repost;
    }

    public Long getThumbUp() {
        return thumbUp;
    }

    public void setThumbUp(Long thumbUp) {
        this.thumbUp = thumbUp;
    }

    public Long getShare() {
        return share;
    }

    public void setShare(Long share) {
        this.share = share;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
