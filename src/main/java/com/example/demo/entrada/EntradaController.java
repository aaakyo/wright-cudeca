package com.example.demo.entrada;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.event.Event;
import com.example.demo.event.EventRepository;

@RestController
@RequestMapping("/api/entradas")
@CrossOrigin(origins = "http://localhost:3000")
public class EntradaController {

    private final EntradaService entradaService;
    private final EventRepository eventRepository;

    @Autowired
    public EntradaController(EntradaService entradaService, EventRepository eventRepository) {
        this.entradaService = entradaService;
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public Entrada compraEntrada(@RequestBody Entrada entrada) {
        return entradaService.compraEntrada(entrada);
    }

    @GetMapping("/{id}")
    public Entrada getEntrada(@PathVariable int id) {
        return entradaService.getEntrada(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Map<String, Object>> getEntradasUsuario(@PathVariable Long usuarioId) {
        List<Entrada> entradas = entradaService.getEntradasPorUsuario(usuarioId);
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Entrada entrada : entradas) {
            Map<String, Object> item = new HashMap<>();
            
            item.put("id", entrada.getId());
            item.put("pagada", entrada.isPagada());
            item.put("usuarioId", entrada.getUsuarioId());
            item.put("email", entrada.getEmail());
            
            Event event = eventRepository.findById(entrada.getEventoId()).orElse(null);
            
            if (event != null) {
                item.put("eventoId", event.getId());
                // Asegúrate de usar los getters que SÍ existan en tu Event.java
                // Si getNombre() da error, prueba getName()
                item.put("nombreEvento", event.getNombre()); 
                item.put("fecha", event.getFechaInicio()); 
                
                // --- CAMBIO AQUÍ: Ponemos una hora por defecto para que no falle ---
                item.put("hora", "20:00"); 
                // ------------------------------------------------------------------
            } else {
                item.put("nombreEvento", "Evento desconocido");
                item.put("fecha", "2025-01-01"); 
            }
            
            resultado.add(item);
        }
        
        return resultado;
    }
}