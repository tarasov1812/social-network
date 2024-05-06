package com.social.back.adapter.controller.common;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestControllerAdvice
public class ExceptionResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionResolver.class);

    private MessageSource messageSource;

    public ExceptionResolver(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Generic exception handler
     *
     * @param e       reaised exception
     * @param request request
     * @param locale  locale
     * @return error object with error detail
     * @throws IOException exception not expected during the handling of the previous exception
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppErrorResponse> handleError(Exception e, HttpServletRequest request, Locale locale) throws IOException {

        LOGGER.error("Unexpected error:", e);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(new MediaType(RequestConstants.MEDIA_TYPE, RequestConstants.MEDIA_SUBTYPE))
                .headers(errorResponseHeaders()).body(generateErrorDetail(HttpStatus.INTERNAL_SERVER_ERROR, String.format("%s%s", RequestConstants.CUSTOM_MESSAGE_ERROR_DEFAULT_BASE, HttpStatus.INTERNAL_SERVER_ERROR.name()), locale));
    }

    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<AppErrorResponse> handleMethodNotFound(Exception e, HttpServletRequest request, Locale locale) throws IOException {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(new MediaType(RequestConstants.MEDIA_TYPE, RequestConstants.MEDIA_SUBTYPE))
                .headers(errorResponseHeaders()).body(generateErrorDetail(HttpStatus.NOT_FOUND, String.format("%s%s", RequestConstants.CUSTOM_MESSAGE_ERROR_DEFAULT_BASE, HttpStatus.NOT_FOUND.name()), locale));
    }

    /**
     * Crea el mapa con la información a devilver en el mensaje
     *
     * @param httpStatus httpstaatus
     * @param errorCode  codigo de error
     * @param locale     locale
     * @return error con la información de detalle de la respuesta
     */
    private AppErrorResponse generateErrorDetail(HttpStatus httpStatus, String errorCode, Locale locale) {

        String lowerCaseErrorCode = (errorCode == null) ? "" : errorCode.toLowerCase();

        AppErrorResponse errorDetail = new AppErrorResponse();
        errorDetail.setTimestamp(new Date());
        errorDetail.setStatus(String.valueOf(httpStatus.value()));
        errorDetail.setError(lowerCaseErrorCode);
        errorDetail.setMessage(this.getExceptionLocalizedMessage(lowerCaseErrorCode, new Object[]{}, locale));

        return errorDetail;
    }


    /**
     * Genera el mensaje de la excepción en base al idioma de la request.
     *
     * @param errorDetailCode código del mensaje a generar
     * @param params          parametros del mensaje
     * @param locale          locale de la request
     * @return mensaje generado a partir de los datos especificados
     */
    private String getExceptionLocalizedMessage(String errorDetailCode, Object[] params, Locale locale) {
        return messageSource.getMessage(errorDetailCode, params, locale);
    }

    /**
     * Genera los headers en caso de error en la request
     *
     * @return httpheaders de la respuesta en caso de error
     */
    private HttpHeaders errorResponseHeaders() {

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, RequestConstants.INVALID_REQUEST);

        return httpHeaders;

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<AppErrorResponse> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request, Locale locale) throws IOException {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        AppErrorResponse response = new AppErrorResponse();
        response.setTimestamp(new Date());
        response.setStatus(String.valueOf(HttpStatus.BAD_REQUEST.value()));
        response.setError("Bad Request");
        response.setMessage("Validation error");
        response.setErrors(errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(new MediaType(RequestConstants.MEDIA_TYPE, RequestConstants.MEDIA_SUBTYPE))
                .headers(errorResponseHeaders()).body(response);
    }
}