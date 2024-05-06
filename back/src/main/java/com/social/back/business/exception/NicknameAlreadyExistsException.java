package com.social.back.business.exception;

public class NicknameAlreadyExistsException extends RuntimeException {

    public NicknameAlreadyExistsException(String message) {
        super(message);
    }
}
