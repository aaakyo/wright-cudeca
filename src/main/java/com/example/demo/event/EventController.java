package com.example.demo.event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000") 
public class EventController {

    private final SistemaEventos sistemaEventos;

    @Autowired
    public EventController(SistemaEventos sistemaEventos) {
        this.sistemaEventos = sistemaEventos;
    }

    /**
     * Obtiene los últimos eventos.
     */
    @GetMapping
    public List<Event> getUltimosEventos(@RequestParam(defaultValue = "10") int cantidad) {
        return sistemaEventos.getUltimosEventos(cantidad);
    }

    /**
     * Obtiene un evento por ID.
     */
    @GetMapping("/{id}")
    public Event getEventoPorId(@PathVariable Long id) {
        return sistemaEventos.getEvento(id);
    }

    /**
     * Crea un nuevo evento. Requiere usuarioId.
     */
    @PostMapping
    public Event crearEvento(@RequestBody Event evento, @RequestParam int usuarioId) {
        return sistemaEventos.crearEvento(evento, usuarioId);
    }

    /**
     * Modifica evento.
     */
    @PutMapping
    public void modificarEvento(@RequestBody Event evento, @RequestParam int usuarioId) {
        sistemaEventos.modificarEvento(evento, usuarioId);
    }

    /**
     * Borra evento.
     */
    @DeleteMapping("/{id}")
    public void borrarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.borrarEvento(id, usuarioId);
    }

    /**
     * Publicar evento.
     */
    @PutMapping("/{id}/publicar")
    public void publicarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.publicarEvento(id, usuarioId);
    }

    /**
     * Cancelar evento.
     */
    @PutMapping("/{id}/cancelar")
    public void cancelarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.cancelarEvento(id, usuarioId);
    }
}