package com.example.demo.entrada;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

public class SistemaEntradas {
    private final EntradaService entradaService;
    private final EntradaRepository entradaRepository;

    @Autowired
    public SistemaEntradas(EntradaRepository repo, EntradaService service) {
        this.entradaService = service;
        this.entradaRepository = repo;
    }

    public Entrada comprarEntrada(Entrada entrada) {
        return entradaService.compraEntrada(entrada);
    }
    public void modificarEntrada(Entrada entrada) {
        entradaService.modificaEntrada(entrada);
    }
    public void borrarEntrada(Entrada entrada) {
        entradaRepository.delete(entrada);
    }
    public Entrada getEntrada(int id) {
        return entradaService.getEntrada(id);
    }

    /**
     *
     * @param id id del evento
     * @return entradas del evento
     */
    public List<Entrada> getEntradas(int id) {
        return entradaService.getEntradasPorEvento(id);
    }
}
