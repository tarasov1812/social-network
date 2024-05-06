package com.social.back.adapter.controller.post;

import com.fasterxml.jackson.annotation.JsonView;
import com.social.back.adapter.controller.author.JsonAuthorViews;

import java.time.LocalDateTime;

public class JsonPost {
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private Long id;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private String content;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private LocalDateTime postDate;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private Long repost;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private Long thumbUp;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private Long share;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private String img;

    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private String authorNickName;

    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private String authorName;

    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class, JsonPostViews.BasicDataResponse.class, JsonPostViews.CheckRequest.class})
    private String authorAvatar;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAuthorNickName() {
        return authorNickName;
    }

    public void setAuthorNickName(String authorNickName) {
        this.authorNickName = authorNickName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorAvatar() {
        return authorAvatar;
    }

    public void setAuthorAvatar(String authorAvatar) {
        this.authorAvatar = authorAvatar;
    }
}

