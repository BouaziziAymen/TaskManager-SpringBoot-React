package com.taskmanager.backend.server.dtos;
import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}