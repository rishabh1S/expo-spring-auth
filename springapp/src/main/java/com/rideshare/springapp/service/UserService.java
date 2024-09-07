package com.rideshare.springapp.service;

import java.util.List;

import com.rideshare.springapp.model.User;

public interface UserService {

    public List<User> getAllUsers();

    public User getUserById(int userId);

    public User findUserByEmail(String email);

    public User createUser(User user);

    public User updateUser(int userId, User userDetails);

    public void deleteUser(int userId);

    public List<User> getUserByRole(String userRole);

}