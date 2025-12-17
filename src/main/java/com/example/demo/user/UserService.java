package com.example.demo.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Método para crear usuario (Registro)
    public User createUser(User user) {
        // 1. Comprobamos si el email ya existe
        User existente = userRepository.findByEmail(user.getEmail());
        if (existente != null) {
            throw new RuntimeException("El email ya está registrado");
        }
        // 2. Si no existe, lo guardamos
        return userRepository.save(user);
    }

    // Método para Login
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        
        // Si el usuario existe Y la contraseña coincide
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null; 
    }

    // --- NUEVO: MÉTODO PARA ACTUALIZAR DATOS (PERFIL) ---
    public User updateUser(Long id, User datosNuevos) {
        // Buscamos al usuario por su ID
        Optional<User> usuarioExistente = userRepository.findById(id);
        
        if (usuarioExistente.isPresent()) {
            User usuario = usuarioExistente.get();
            
            // Actualizamos los campos permitidos
            usuario.setNombre(datosNuevos.getNombre());
            usuario.setApellidos(datosNuevos.getApellidos());
            usuario.setTelefono(datosNuevos.getTelefono());
            usuario.setDni(datosNuevos.getDni());
            usuario.setDireccionPostal(datosNuevos.getDireccionPostal());
            
            // Guardamos los cambios
            return userRepository.save(usuario);
        }
        return null; // Si no existe el usuario
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}