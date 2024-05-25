package com.taskmanager.backend.server.services;

import com.taskmanager.backend.server.entities.User;
import com.taskmanager.backend.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// UserServiceImpl.java
@Service
public class UserService{
    @Autowired
    UserRepository userRepository;

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void save(User user){
        userRepository.save(user);
    }
}
