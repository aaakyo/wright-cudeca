package com.example.demo.auth;

import com.example.demo.admin.Admin;
import com.example.demo.admin.AdminRepository;
import com.example.demo.admin.AdminService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

@Service
public class SistemaAutenticacion {

    private final AdminService adminService;
    private final UserService userService;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    private HashMap<Integer, Long> sesionesAdmin = new HashMap<>();
    private HashMap<Integer, Long> sesionesUser = new HashMap<>();

    @Autowired
    public SistemaAutenticacion(AdminService adminService, UserService userService, AdminRepository adminRepository, UserRepository userRepository) {
        this.adminService = adminService;
        this.userService = userService;
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    public int iniciarSesion(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            Random r = new Random();
            int sesionId = r.nextInt();
            sesionesAdmin.put(sesionId, admin.getId());
            return sesionId;
        }

        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            Random r = new Random();
            int sesionId = r.nextInt();
            sesionesUser.put(sesionId, user.getId());
            return sesionId;
        }

        return -1;
    }

    public boolean esAdministrador(int id) {
        return sesionesAdmin.containsKey(id);
    }

    public void cerrarSesion(int id) {
        sesionesAdmin.remove(id);
        sesionesUser.remove(id);
    }

    public Admin crearAdministrador(Admin administrador) {
        return adminService.crearAdministrador(administrador);
    }

    public void modificarAdministrador(Admin administrador) {
        adminService.crearAdministrador(administrador); // crear y modificar usan el mismo metodo save
    }

    public void borrarAdministrador(int id) {
        adminService.borrarAdministrador((long) id);
    }

    public Admin getAdministrador(int id) {
        return adminService.getAdministrador((long) id);
    }

    public User crearUsuario(User usuario) {
        return userService.createUser(usuario);
    }

    public void modificarUsuario(User usuario) {
        userService.createUser(usuario); // crear y modificar usan el mismo metodo save
    }

    public void borrarUsuario(User usuario) {
        userService.deleteUser(usuario.getId());
    }

    public User getUsuario(int id) {
        return userService.getUserById((long) id);
    }
}