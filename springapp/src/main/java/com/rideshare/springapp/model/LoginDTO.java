package com.rideshare.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private int userId;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole userRole;
    private String token;
}
