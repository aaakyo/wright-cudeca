package com.example.demo.admin;

import com.example.demo.user.User;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
    public class LoginForm {
        public String email;
        public String contrasena;
    }
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Admin getAdministrador(@PathVariable Long id) {
        return adminService.getAdministrador(id);
    }

    @PostMapping
    public Admin crearAdministrador(@RequestBody Admin admin) {
        return adminService.crearAdministrador(admin);
    }

    @DeleteMapping("/{id}")
    public void borrarAdministrador(@PathVariable Long id) {
        adminService.borrarAdministrador(id);
    }

    @GetMapping("/esAdministrador")
    public boolean esAdministrador(@RequestParam Long id) { return adminService.esAdministrador(id); }

    @PostMapping("/iniciarSesion")
    public Integer iniciarSesion(@RequestBody LoginForm body) {return adminService.iniciarSesion(body.email, body.contrasena); }

    @PostMapping("/cerrarSesion")
    public void cerrarSesion(@RequestBody Integer sesion) {adminService.cerrarSesion(sesion);}
}
