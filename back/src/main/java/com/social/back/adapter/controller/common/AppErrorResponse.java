package com.social.back.adapter.controller.common;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Map;

public class AppErrorResponse {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = RequestConstants.DATE_FORMAT,  timezone = RequestConstants.DATE_TIMEZONE)
    private Date timestamp;
    private String status;
    private String error;
    private String message;

    private Map<String, String> errors;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
