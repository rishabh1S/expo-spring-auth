package com.rideshare.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rideshare.springapp.configuration.JwtUtils;
import com.rideshare.springapp.model.LoginDTO;
import com.rideshare.springapp.model.User;
import com.rideshare.springapp.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User newUser = userService.createUser(user);
            return ResponseEntity.status(201).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

            if (authentication.isAuthenticated()) {
                User myUser = userService.findUserByEmail(user.getEmail());
                if (myUser == null) {
                    throw new UsernameNotFoundException("User not found");
                }
                LoginDTO userDTO = new LoginDTO();
                userDTO.setUserId(myUser.getUserId());
                userDTO.setEmail(myUser.getEmail());
                userDTO.setFirstName(myUser.getFirstName());
                userDTO.setLastName(myUser.getLastName());
                userDTO.setUserRole(myUser.getUserRole());
                userDTO.setToken(jwtService.GenerateToken(myUser.getEmail()));

                return ResponseEntity.status(200).body(userDTO);
            } else {
                throw new BadCredentialsException("Invalid credentials");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        } catch (AuthenticationException e) {
            return ResponseEntity.status(500).body("Error logging in: " + e.getMessage());
        }
    }
}
