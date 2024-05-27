package com.taskmanager.backend.server.services;

import com.taskmanager.backend.server.entities.User;
import com.taskmanager.backend.server.exception.NotFoundException;
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

    public User getById(Long userId) {
       return findOrThrow(userId);
    }

    private User findOrThrow(final Long id){
        return userRepository.findById(id).orElseThrow(()->new NotFoundException("User not found="+id));
    }
}
