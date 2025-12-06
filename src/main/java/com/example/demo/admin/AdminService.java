package com.example.demo.admin;

import com.example.demo.admin.Admin;
import com.example.demo.admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class AdminService {
    private final AdminRepository adminRepository;
    private HashMap<Long, Integer> sesiones = new HashMap<>();

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

    public Integer iniciarSesion(Long email, String contrasena) {
        //TODO: ESTO ES EMAIL
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin != null) {
            if (admin.getPassword().equals(contrasena)) {
                Random r = new Random();
                int sesion = r.nextInt();
                sesiones.put(admin.getId(), sesion);
                return sesion;
            }
        }
        return -1;
    }

    //TODO: FALTA CERRARSESION
}
