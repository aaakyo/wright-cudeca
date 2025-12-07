package com.example.demo.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos") // Corregido a español
public class EventController {

    private final SistemaEventos sistemaEventos;

    @Autowired
    public EventController(SistemaEventos sistemaEventos) {
        this.sistemaEventos = sistemaEventos;
    }

    /**
     * Obtiene los últimos eventos. Acepta un parámetro 'cantidad' para limitar los resultados.
     * Ejemplo: GET /api/eventos?cantidad=5
     */
    @GetMapping
    public List<Event> getUltimosEventos(@RequestParam(defaultValue = "10") int cantidad) {
        return sistemaEventos.getUltimosEventos(cantidad);
    }

    /**
     * Obtiene un evento específico por su ID.
     * Ejemplo: GET /api/eventos/1
     */
    @GetMapping("/{id}")
    public Event getEventoPorId(@PathVariable Long id) {
        return sistemaEventos.getEvento(id);
    }

    /**
     * Crea un nuevo evento. El ID del usuario (administrador) se pasa como parámetro.
     * Ejemplo: POST /api/eventos?usuarioId=1
     */
    @PostMapping
    public Event crearEvento(@RequestBody Event evento, @RequestParam int usuarioId) {
        return sistemaEventos.crearEvento(evento, usuarioId);
    }

    /**
     * Modifica un evento existente. El ID del usuario (administrador) se pasa como parámetro.
     * Ejemplo: PUT /api/eventos?usuarioId=1
     */
    @PutMapping
    public void modificarEvento(@RequestBody Event evento, @RequestParam int usuarioId) {
        sistemaEventos.modificarEvento(evento, usuarioId);
    }

    /**
     * Borra un evento por su ID. El ID del usuario (administrador) se pasa como parámetro.
     * Ejemplo: DELETE /api/eventos/1?usuarioId=1
     */
    @DeleteMapping("/{id}")
    public void borrarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.borrarEvento(id, usuarioId);
    }


    /**
     * Marca un evento como publicado. El ID del usuario (administrador) se pasa como parámetro.
     * Ejemplo: PUT /api/eventos/1/publicar?usuarioId=1
     */
    @PutMapping("/{id}/publicar")
    public void publicarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.publicarEvento(id, usuarioId);
    }

    /**
     * Marca un evento como cancelado. El ID del usuario (administrador) se pasa como parámetro.
     * Ejemplo: PUT /api/eventos/1/cancelar?usuarioId=1
     */
    @PutMapping("/{id}/cancelar")
    public void cancelarEvento(@PathVariable Long id, @RequestParam int usuarioId) {
        sistemaEventos.cancelarEvento(id, usuarioId);
    }
}
