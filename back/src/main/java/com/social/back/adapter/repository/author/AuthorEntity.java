package com.social.back.adapter.repository.author;

import com.social.back.adapter.repository.post.PostEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "authors")
public class AuthorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;
    @Column(name = "nickName", unique = true, nullable = false)
    private String nickName;
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "name")
    private String name;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "avatar")
    private String avatar;
    @Column(name = "about")
    private String about;
    @Column(name = "location")
    private String location;
    @Column(name = "stack")
    private String stack;
    @Column(name = "birthdate")
    private Date birthdate;
    @Column(name = "show_birthdate")
    private boolean showBirthdate;
    @Column(name = "open_to_work")
    private boolean openToWork;
    @OneToMany(mappedBy = "author", targetEntity = PostEntity.class,  cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<PostEntity> posts;

    public AuthorEntity() {
        this.posts = new ArrayList<PostEntity>();
    }

    public List<PostEntity> getPosts() {
        return posts;
    }

    public void setPosts(List<PostEntity> posts) {
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
}
