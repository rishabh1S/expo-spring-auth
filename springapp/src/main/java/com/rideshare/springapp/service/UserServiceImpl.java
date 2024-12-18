package com.rideshare.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rideshare.springapp.exception.DuplicateRecordException;
import com.rideshare.springapp.model.User;
import com.rideshare.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(int userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    @Override
    public User createUser(User user) {
        User existingUser = userRepo.findByEmail(user.getEmail()).orElse(null);
        if (existingUser != null) {
            throw new DuplicateRecordException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User updateUser(int userId, User userDetails) {
        Optional<User> getUser = userRepo.findById(userId);
        if (getUser.isPresent()) {
            User user = getUser.get();
            user.setEmail(userDetails.getEmail());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setPassword(userDetails.getPassword());
            user.setUserRole(userDetails.getUserRole());
            return userRepo.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(int userId) {
        if (userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
        }
    }

    @Override
    public List<User> getUserByRole(String userRole) {
        return userRepo.findByUserRole(userRole).orElse(List.of());
    }
}