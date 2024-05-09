package com.social.back.adapter.controller.post;

import com.fasterxml.jackson.annotation.JsonView;
import com.social.back.adapter.controller.common.AppErrorResponse;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.model.post.Post;
import com.social.back.business.model.post.PostFilter;
import com.social.back.business.model.post.PostResult;
import com.social.back.business.service.post.PostManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PostController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PostController.class);
    private PostManager postManager;
    private final ModelMapper modelMapper;

    public PostController(PostManager postManager) {
        this.postManager = postManager;
        this.modelMapper = new ModelMapper();
    }

    @Operation(summary = "Find posts using filters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonPost.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @GetMapping("/findLatesPosts")
    @JsonView(JsonPostViews.BasicDataResponse.class)
    public List<JsonPost> getPosts() {
        LOGGER.trace("FIND Posts INIT");
        PostFilter filter = new PostFilter();
        List<Post> posts = postManager.findPosts(filter, new PageableFilter());
        return posts.stream().map(post -> {
            JsonPost jsonPost = new JsonPost();
            jsonPost.setId(post.getId());
            jsonPost.setContent(post.getContent());
            jsonPost.setPostDate(post.getPostDate());
            jsonPost.setRepost(post.getRepost());
            jsonPost.setThumbUp(post.getThumbUp());
            jsonPost.setShare(post.getShare());
            jsonPost.setImg(post.getImg());
            jsonPost.setAuthorId(post.getAuthor().getId());
            jsonPost.setAuthorName(post.getAuthor().getName());
            jsonPost.setAuthorNickName(post.getAuthor().getNickName());
            jsonPost.setAuthorAvatar(post.getAuthor().getAvatar());
            return jsonPost;
        }).collect(Collectors.toList());
    }
    @Operation(summary = "Get details about post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonPost.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @JsonView(JsonPostViews.BasicDataResponse.class)
    @GetMapping("/postGet/{id}")
    public JsonPost getPostById(@PathVariable @Valid Long id) {
        LOGGER.trace("GET Post by ID INIT");
        Post post = this.postManager.findPostById(id);
        JsonPost jsonPost = this.modelMapper.map(post, JsonPost.class);
        return jsonPost;
    }
    @Operation(summary = "Create an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonPostResult.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @PostMapping("/createPost")
    public JsonPostResult createPost(@RequestBody @Valid JsonPost JsonPost) {
        LOGGER.trace("CREATE Post INIT");
            Post post = this.modelMapper.map(JsonPost, Post.class);
            PostResult postResult = postManager.createPost(post);
            JsonPostResult jsonPostResult = this.modelMapper.map(postResult, JsonPostResult.class);
            return jsonPostResult;
    }
    @Operation(summary = "Delete an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonPostResult.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @DeleteMapping("/deletePost/{id}")
    public JsonPostResult deletePost(@PathVariable Long id) {
        LOGGER.trace("DELETE Post INIT");
        PostResult postResult = postManager.deletePost(id);
        JsonPostResult JsonPostResult = this.modelMapper.map(postResult, JsonPostResult.class);
        return JsonPostResult;
    }
    @Operation(summary = "Update an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonPostResult.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),

            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @PutMapping("/updatePost/{id}")
    public JsonPostResult updatePost(@PathVariable Long id, @RequestBody @Valid JsonPost JsonPost) {
        LOGGER.trace("UPDATE Facility INIT");
        Post post = this.modelMapper.map(JsonPost, Post.class);
        PostResult postResult = postManager.updatePost(id, post);
        JsonPostResult JsonPostResult = this.modelMapper.map(postResult, JsonPostResult.class);
        return JsonPostResult;
    }
}
