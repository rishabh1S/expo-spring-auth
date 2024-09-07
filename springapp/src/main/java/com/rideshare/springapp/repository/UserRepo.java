package com.rideshare.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rideshare.springapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    public Optional<User> findByEmail(String email);

    public Optional<User> findById(int id);

    public Optional<List<User>> findByUserRole(String role);

    public boolean existsByUserRole(String role);

}