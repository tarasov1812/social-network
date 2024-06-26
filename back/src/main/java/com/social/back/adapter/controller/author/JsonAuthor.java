package com.social.back.adapter.controller.author;
import com.fasterxml.jackson.annotation.JsonView;
import com.social.back.adapter.controller.post.JsonPost;
import com.social.back.adapter.controller.subscription.JsonSubscription;
import com.social.back.business.model.subscription.Subscription;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JsonAuthor {
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private Long id;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String nickName;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String email;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String name;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String password;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String avatar;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String background;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String about;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String location;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private String stack;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private Date birthdate;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private boolean showBirthdate;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private boolean openToWork;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private List<JsonPost> posts;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private List<JsonSubscription> subscriptions;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private List<JsonSubscription> subscribers;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private Long postCount;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private Long followingCount;
    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private Long followersCount;

    @JsonView(value = {JsonAuthorViews.BasicDataResponse.class, JsonAuthorViews.CheckRequest.class})
    private boolean isSubscribed;
    public JsonAuthor() {
        this.posts = new ArrayList<JsonPost>();
        this.subscribers = new ArrayList<JsonSubscription>();
        this.subscriptions = new ArrayList<JsonSubscription>();
    }

    public List<JsonPost> getPosts() {
        return posts;
    }

    public void setPosts(List<JsonPost> posts) {
        this.posts = posts;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public boolean isShowBirthdate() {
        return showBirthdate;
    }

    public void setShowBirthdate(boolean showBirthdate) {
        this.showBirthdate = showBirthdate;
    }

    public Long getPostCount() {
        return postCount;
    }

    public void setPostCount(Long postCount) {
        this.postCount = postCount;
    }

    public Long getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(Long followingCount) {
        this.followingCount = followingCount;
    }

    public Long getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(Long followersCount) {
        this.followersCount = followersCount;
    }

    public String getStack() {
        return stack;
    }

    public void setStack(String stack) {
        this.stack = stack;
    }

    public boolean isOpenToWork() {
        return openToWork;
    }

    public void setOpenToWork(boolean openToWork) {
        this.openToWork = openToWork;
    }

    public boolean isSubscribed() {
        return isSubscribed;
    }

    public void setSubscribed(boolean subscribed) {
        isSubscribed = subscribed;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public List<JsonSubscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<JsonSubscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public List<JsonSubscription> getSubscribers() {
        return subscribers;
    }

    public void setSubscribers(List<JsonSubscription> subscribers) {
        this.subscribers = subscribers;
    }
}
