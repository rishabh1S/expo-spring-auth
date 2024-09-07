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
    private String username;
    private String mobileNumber;
    private String userRole;
    private String token;
}
