package com.example.demo;

import com.example.demo.auth.SistemaAutenticacion;
import com.example.demo.crm.CrmService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SistemaAutenticacionTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CrmService crmService;

    @InjectMocks
    private SistemaAutenticacion sistemaAutenticacion;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User("John", "Doe", "john.doe@example.com", "123456789", "12345678A", "Street", false, "password");
    }

    @Test
    void testCrearUsuario_Exito() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
        when(userService.createUser(any(User.class))).thenReturn(user);

        User createdUser = sistemaAutenticacion.crearUsuario(user);

        assertNotNull(createdUser);
        assertEquals("John", createdUser.getNombre());
    }

    @Test
    void testCrearUsuario_UsuarioYaExiste() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        User createdUser = sistemaAutenticacion.crearUsuario(user);

        assertNull(createdUser);
    }

    @Test
    void testCrearUsuario_CamposObligatoriosFaltantes() {
        User userSinNombre = new User(null, "Doe", "john.doe@example.com", "123456789", "12345678A", "Street", false, "password");

        User createdUser = sistemaAutenticacion.crearUsuario(userSinNombre);

        assertNull(createdUser);
    }
}
