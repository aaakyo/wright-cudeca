package com.example.demo.user;

public record User(
        Integer id,
        String nombre,
        String apellidos,
        String email,
        String telefono,
        String dni,
        String direccionPostal,
        Boolean socio,
        String password
) {}
