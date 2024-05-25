package com.taskmanager.backend.server.exception;

public class RoleNotFoundException extends Exception{
    public RoleNotFoundException(String message){
        super(message);
    }
}
