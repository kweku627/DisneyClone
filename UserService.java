package com.example.disney_clone.service;


import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.disney_clone.model.User;
import com.example.disney_clone.respository.UserRepository;

@Service
public class UserService {




    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        
        user.setPassword(passwordEncoder.encode(password)); 
        user.setRole(role);
        return userRepository.save(user);
    }
  
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public PasswordEncoder getPasswordEncoder() {
    return passwordEncoder;
  }
}




