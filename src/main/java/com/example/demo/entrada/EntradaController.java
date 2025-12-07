package com.example.demo.entrada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entradas")
public class EntradaController {

    private final EntradaService entradaService;

    @Autowired
    public EntradaController(EntradaService entradaService) {
        this.entradaService = entradaService;
    }

    @PostMapping
    public Entrada compraEntrada(@RequestBody Entrada entrada) {
        return entradaService.compraEntrada(entrada);
    }

    @PutMapping
    public Entrada modificaEntrada(@RequestBody Entrada entrada) {
        return entradaService.modificaEntrada(entrada);
    }

    @GetMapping("/{id}")
    public Entrada getEntrada(@PathVariable int id) {
        return entradaService.getEntrada(id);
    }
}
