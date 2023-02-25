package com.proyecto.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavegacionController {
    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/users")
    public String users() {
        return "users-list";
    }

    @GetMapping("/users/edit")
    public String users_edit() {
        return "users-edit";}
}
