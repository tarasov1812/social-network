package com.social.back.business.exception;

public class NicknameAndEmailAlreadyExistsException extends RuntimeException{
    public NicknameAndEmailAlreadyExistsException(String message){
        super(message);
    }
}
