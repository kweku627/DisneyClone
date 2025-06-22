package com.example.disney_clone.respository;

    

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.disney_clone.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}


