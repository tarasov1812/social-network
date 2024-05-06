package com.social.back.business.model.post;

import com.social.back.business.model.author.Author;

import java.time.LocalDateTime;

public class Post {
    private Long id;
    private Author author;
    private String content;
    private LocalDateTime postDate;
    private Long repost;
    private Long thumbUp;
    private Long share;
    private String img;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
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
