package com.example.demo.crm;

import com.example.demo.user.User;
import org.springframework.stereotype.Service;

@Service
public class CrmService {

    public void registrarUsuario(User user) {
        // Lógica para registrar el usuario en el CRM
        // Por ahora, solo imprimimos un mensaje en la consola
        System.out.println("Registrando usuario en el CRM: " + user.getNombre());
    }
}
