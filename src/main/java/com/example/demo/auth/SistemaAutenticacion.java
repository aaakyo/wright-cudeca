package com.example.demo.auth;

import com.example.demo.admin.Admin;
import com.example.demo.admin.AdminRepository;
import com.example.demo.admin.AdminService;
import com.example.demo.crm.CrmService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Random;

@Service
public class SistemaAutenticacion {

    private final AdminService adminService;
    private final UserService userService;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final CrmService crmService;

    private HashMap<Integer, Long> sesionesAdmin = new HashMap<>();
    private HashMap<Integer, Long> sesionesUser = new HashMap<>();

    @Autowired
    public SistemaAutenticacion(AdminService adminService, UserService userService, AdminRepository adminRepository, UserRepository userRepository, CrmService crmService) {
        this.adminService = adminService;
        this.userService = userService;
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.crmService = crmService;
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
        // 1. Comprobar si el usuario ya existe
        if (userRepository.findByEmail(usuario.getEmail()) != null) {
            return null;
        }

        // 2. Revisar campos obligatorios
        if (!StringUtils.hasText(usuario.getNombre()) ||
            !StringUtils.hasText(usuario.getApellidos()) ||
            !StringUtils.hasText(usuario.getEmail()) ||
            !StringUtils.hasText(usuario.getDni()) ||
            !StringUtils.hasText(usuario.getPassword())) {
            return null;
        }

        // 3. Crear copia interna y completar datos opcionales
        User newUser = new User();
        newUser.setNombre(usuario.getNombre());
        newUser.setApellidos(usuario.getApellidos());
        newUser.setEmail(usuario.getEmail());
        newUser.setDni(usuario.getDni());
        newUser.setPassword(usuario.getPassword());

        newUser.setTelefono(usuario.getTelefono() != null ? usuario.getTelefono() : "");
        newUser.setDireccionPostal(usuario.getDireccionPostal() != null ? usuario.getDireccionPostal() : "");
        newUser.setSocio(usuario.getSocio() != null ? usuario.getSocio() : false);


        // 4. Enviar datos al CRM
        crmService.registrarUsuario(newUser);

        // 5. Guardar y devolver el nuevo usuario
        return userService.createUser(newUser);
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