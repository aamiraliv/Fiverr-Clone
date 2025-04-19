package com.microsevice.auth_service.Exception;

public class UserAlredyExistException extends RuntimeException{
    public UserAlredyExistException(String message) {
        super(message);
    }
}
