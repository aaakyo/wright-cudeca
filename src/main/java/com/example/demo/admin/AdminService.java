package com.example.demo.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private HashMap<Integer, Long> sesiones = new HashMap<>();

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdministrador(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin crearAdministrador(Admin admin) {
        return adminRepository.save(admin);
    }

    public void borrarAdministrador(Long id) {
        adminRepository.deleteById(id);
    }

    public boolean esAdministrador(Long id) {
        Admin admin = adminRepository.findById(id).orElse(null);
        return admin != null;
    }

    public Integer iniciarSesion(String email, String contrasena) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            if (admin.getPassword().equals(contrasena)) {
                Random r = new Random();
                int sesion = r.nextInt();
                sesiones.put(sesion, admin.getId());
                return sesion;
            }
        }
        return -1;
    }

    public void cerrarSesion(Integer sesion) {
        sesiones.remove(sesion);
    }
}