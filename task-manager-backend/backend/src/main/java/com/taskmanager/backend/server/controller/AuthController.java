package com.taskmanager.backend.server.controller;

import com.taskmanager.backend.server.dtos.ApiResponseDto;
import com.taskmanager.backend.server.dtos.SignInRequestDto;
import com.taskmanager.backend.server.dtos.SignUpRequestDto;
import com.taskmanager.backend.server.exception.RoleNotFoundException;
import com.taskmanager.backend.server.exception.UserAlreadyExistsException;
import com.taskmanager.backend.server.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/signup")
    ResponseEntity<ApiResponseDto<?>> registerUser(@RequestBody @Valid SignUpRequestDto signUpRequestDto) throws RoleNotFoundException, UserAlreadyExistsException {
        return authService.signUpUser(signUpRequestDto);
    }
    @PostMapping("/signin")
    public ResponseEntity<ApiResponseDto<?>> signInUser(@RequestBody @Valid SignInRequestDto signInRequestDto){
        return authService.signInUser(signInRequestDto);
    }

}
