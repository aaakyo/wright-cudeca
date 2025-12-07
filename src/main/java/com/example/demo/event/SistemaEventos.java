package com.example.demo.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

// ATENCIÓN: Para evitar errores de compilación, este archivo debe ser renombrado a "SistemaEventos.java"
@Service
public class SistemaEventos {

    private final EventRepository eventRepository;
    // Inyecta otros repositorios si son necesarios para la validación, ej:
    // private final AdminRepository adminRepository;

    @Autowired
    public SistemaEventos(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Crea un nuevo evento. Requiere permisos de administrador.
     */
    public Event crearEvento(Event evento, int usuarioId) {
        // Lógica de validación de permisos:
        // Antes de ejecutar, se debe validar si el usuarioId corresponde a un Administrador.
        System.out.println("DEBUG: Validando si el usuario " + usuarioId + " es administrador...");
        // Ejemplo: if (!esAdmin(usuarioId)) { throw new SecurityException("Acceso denegado"); }
        return eventRepository.save(evento);
    }

    /**
     * Modifica un evento existente. Requiere permisos de administrador.
     */
    public void modificarEvento(Event evento, int usuarioId) {
        // Lógica de validación de permisos:
        System.out.println("DEBUG: Validando si el usuario " + usuarioId + " es administrador...");
        eventRepository.save(evento);
    }

    /**
     * Borra un evento por su ID. Requiere permisos de administrador.
     */
    public void borrarEvento(Long id, int usuarioId) {
        // Lógica de validación de permisos:
        System.out.println("DEBUG: Validando si el usuario " + usuarioId + " es administrador...");
        eventRepository.deleteById(id);
    }

    /**
     * Obtiene un evento por su ID.
     */
    public Event getEvento(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    /**
     * Publica un evento para que sea visible. Requiere permisos de administrador.
     */
    public void publicarEvento(Long id, int usuarioId) {
        // Lógica de validación de permisos:
        System.out.println("DEBUG: Validando si el usuario " + usuarioId + " es administrador...");
        Event evento = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        // Aquí iría la lógica para cambiar el estado del evento a 'publicado'
        // Ejemplo: evento.setPublicado(true);
        eventRepository.save(evento);
    }

    /**
     * Obtiene una lista de los últimos eventos creados, limitado por la cantidad.
     */
    public List<Event> getUltimosEventos(int cantidad) {
        // PageRequest.of(0, cantidad) crea una página que empieza en el índice 0 y tiene 'cantidad' de elementos.
        return eventRepository.findAll(PageRequest.of(0, cantidad)).getContent();
    }

    /**
     * Cancela un evento. Requiere permisos de administrador.
     */
    public void cancelarEvento(Long id, int usuarioId) {
        // Lógica de validación de permisos:
        System.out.println("DEBUG: Validando si el usuario " + usuarioId + " es administrador...");
        Event evento = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
        // Aquí iría la lógica para cambiar el estado a 'cancelado'.
        // Ejemplo: evento.setCancelado(true);
        eventRepository.save(evento);
    }
}