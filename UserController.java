package com.example.disney_clone.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.disney_clone.model.User;
import com.example.disney_clone.service.UserService;
  
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
  
    @PostMapping("/register")
    public User register(@RequestBody UserRegistrationRequest request) {
        return userService.registerUser(
                request.getUsername(), 
                request.getPassword(), 
                request.getRole()
        );

    }
    @PostMapping("/login")
public String login(@RequestBody LoginRequest request) {
    User user = userService.findByUsername(request.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!userService.getPasswordEncoder().matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return "Login successful!";
}

}

class UserRegistrationRequest {
    private String username;
    private String password;
    private String role;

    
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }
  

    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
