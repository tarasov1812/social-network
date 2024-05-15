package com.social.back.adapter.controller.subscription;

import com.social.back.adapter.controller.common.AppErrorResponse;
import com.social.back.adapter.reqests.SubscriptionRequest;
import com.social.back.business.model.subscription.SubscriptionResult;
import com.social.back.business.service.subscription.SubscriptionManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class SubscriptionController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SubscriptionController.class);
    private SubscriptionManager subscriptionManager;
    private final ModelMapper modelMapper;

    public SubscriptionController(SubscriptionManager subscriptionManager) {
        this.subscriptionManager = subscriptionManager;
        this.modelMapper = new ModelMapper();
    }

    @Operation(summary = "Subscribe to an author")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonSubscriptionResult.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) })
    })
    @PostMapping("/subscribe")
    public ResponseEntity<JsonSubscriptionResult> subscribeToAuthor(@RequestBody SubscriptionRequest request) {
        LOGGER.trace("SUBSCRIBE to Author INIT");
            SubscriptionResult subscriptionResult = subscriptionManager.subscribeToAuthor(request.getSubscriberId(), request.getSubscribedToId());
            JsonSubscriptionResult jsonSubscriptionResult = this.modelMapper.map(subscriptionResult, JsonSubscriptionResult.class);
            return ResponseEntity.ok(jsonSubscriptionResult);
    }

    @Operation(summary = "Unsubscribe from an author")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE , schema = @Schema(implementation = JsonSubscriptionResult.class)) }),
            @ApiResponse(responseCode = "500", description = "Error",content = { @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AppErrorResponse.class)) })
    })
    @DeleteMapping("/unsubscribe")
    public ResponseEntity<JsonSubscriptionResult> unsubscribeFromAuthor(@RequestBody SubscriptionRequest request) {
        LOGGER.trace("UNSUBSCRIBE from Author INIT");
            SubscriptionResult subscriptionResult = subscriptionManager.unsubscribeFromAuthor(request.getSubscriberId(), request.getSubscribedToId());
            JsonSubscriptionResult jsonSubscriptionResult = this.modelMapper.map(subscriptionResult, JsonSubscriptionResult.class);
            return ResponseEntity.ok(jsonSubscriptionResult);
    }
}
