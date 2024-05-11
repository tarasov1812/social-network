package com.social.back.adapter.controller.author;

import com.fasterxml.jackson.annotation.JsonView;
import com.social.back.adapter.controller.common.AppErrorResponse;
import com.social.back.adapter.reqests.ChangeEmailRequest;
import com.social.back.adapter.reqests.ChangePasswordRequest;
import com.social.back.adapter.reqests.LoginRequest;
import com.social.back.business.exception.EmailAlreadyExistsException;
import com.social.back.business.exception.NicknameAlreadyExistsException;
import com.social.back.business.exception.NicknameAndEmailAlreadyExistsException;
import com.social.back.business.model.author.Author;
import com.social.back.business.model.author.AuthorFilter;
import com.social.back.business.model.author.AuthorResult;
import com.social.back.business.model.common.PageableFilter;
import com.social.back.business.service.author.AuthorManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuthorController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthorController.class);
    private AuthorManager authorManager;
    private final ModelMapper modelMapper;

    public AuthorController(AuthorManager authorManager) {
        this.authorManager = authorManager;
        this.modelMapper = new ModelMapper();
    }

    @Operation(summary = "Find users using filters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonAuthor.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @GetMapping("/findByFilter")
    @JsonView(JsonAuthorViews.BasicDataResponse.class)
    public List<JsonAuthor> getAuthros() {
        LOGGER.trace("FIND Authors INIT");
        AuthorFilter filter = new AuthorFilter();
        List<Author> posts = authorManager.findAuthors(filter, new PageableFilter());
        return posts.stream().map( post -> { return modelMapper.map(post, JsonAuthor.class); }).collect(Collectors.toList());
    }
    @Operation(summary = "Get details about post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonAuthor.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @JsonView(JsonAuthorViews.BasicDataResponse.class)
    @GetMapping("/get/{id}")
    public JsonAuthor getAuthorById(@PathVariable @Valid Long id) {
        LOGGER.trace("GET Author by ID INIT");
        Author post = this.authorManager.findAuthorById(id);
        JsonAuthor jsonAuthor = this.modelMapper.map(post, JsonAuthor.class);
        return jsonAuthor;
    }
    @Operation(summary = "Create an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonAuthorResult.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
            @ApiResponse(responseCode = "406", description = "Not acceptable - Nickname already exists", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
            @ApiResponse(responseCode = "409", description = "Conflict - Email already exists", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
            @ApiResponse(responseCode = "410", description = "Gone - Email and nickname already exists", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @PostMapping("/create")
    public JsonAuthorResult createAuthor(@RequestBody @Valid JsonAuthor jsonAuthor) {
        LOGGER.trace("CREATE Author INIT");
        try {
            String empltyAvatar = "https://ucarecdn.com/117dd0e7-4525-4fe4-ba5a-55f0e4a21b25/5208421_avatar_person_profile_user_icon.png";
            jsonAuthor.setAvatar(empltyAvatar);
            Author post = this.modelMapper.map(jsonAuthor, Author.class);
            AuthorResult postResult = authorManager.createAuthor(post);
            JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
            return jsonAuthorResult;
        } catch (NicknameAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Nickname already exists", e);
        } catch (EmailAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists", e);
        } catch (NicknameAndEmailAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.GONE, "Email and nickname already exist", e);
        }
    }
    @Operation(summary = "Delete an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonAuthorResult.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @DeleteMapping("/delete/{id}")
    public JsonAuthorResult deleteAuthor(@PathVariable Long id) {
        LOGGER.trace("DELETE Author INIT");
        AuthorResult postResult = authorManager.deleteAuthor(id);
        JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
        return jsonAuthorResult;
    }
    @Operation(summary = "Update an post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonAuthorResult.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request - Validation error",
                    content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class))}),

            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) }),
    })
    @PutMapping("/update/{id}")
    public JsonAuthorResult updateAuthor(@PathVariable Long id, @RequestBody @Valid JsonAuthor jsonAuthor) {
        LOGGER.trace("UPDATE author INIT");
        Author author = this.modelMapper.map(jsonAuthor, Author.class);
        AuthorResult postResult = authorManager.updateAuthor(id, author);
        JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
        return jsonAuthorResult;
    }

    @PutMapping("/changePassword/{id}")
    public JsonAuthorResult updatePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest changePasswordRequest) {
        LOGGER.trace("UPDATE password INIT");
        AuthorResult postResult = authorManager.updatePassword(id, changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());
        JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
        return jsonAuthorResult;
    }

    @PutMapping("/changeEmail/{id}")
    public JsonAuthorResult updateEmail(@PathVariable Long id, @RequestBody ChangeEmailRequest changeEmailRequest) {
        LOGGER.trace("UPDATE email INIT");
        AuthorResult postResult = authorManager.updateEmail(id, changeEmailRequest.getEmail(), changeEmailRequest.getPassword());
        JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
        return jsonAuthorResult;
    }

    @PostMapping("/uploadCV/{authorId}")
    public JsonAuthorResult uploadCV(@PathVariable Long authorId, @RequestParam("file") MultipartFile file) {
        LOGGER.trace("Uploading PDF INIT");
        AuthorResult postResult = authorManager.uploadCV(authorId, file);
        JsonAuthorResult jsonAuthorResult = this.modelMapper.map(postResult, JsonAuthorResult.class);
        return jsonAuthorResult;
    }

    @GetMapping("/download-pdf/{authorId}")
    public ResponseEntity<ByteArrayResource> downloadPdf(@PathVariable Long authorId) {
        String fileName = "cv.pdf";
        ByteArrayResource resource = authorManager.downloadCv(authorId);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}
