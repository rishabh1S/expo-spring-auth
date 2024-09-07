package com.rideshare.springapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TestController
 */
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public String test() {
        return "The app is running successfully.";
    }
}