package com.example.demo.entrada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntradaService {

    private final EntradaRepository entradaRepository;

    @Autowired
    public EntradaService(EntradaRepository entradaRepository) {
        this.entradaRepository = entradaRepository;
    }

    public Entrada compraEntrada(Entrada entrada) {
        return entradaRepository.save(entrada);
    }

    public Entrada modificaEntrada(Entrada entrada) {
        return entradaRepository.save(entrada);
    }

    public Entrada getEntrada(int id) {
        return entradaRepository.findById(id).orElse(null);
    }

    public List<Entrada> getEntradasPorEvento(int eventoId) {
        // This is a mock implementation. A real implementation would require a relationship
        // between Entrada and Event entities.
        return entradaRepository.findAll().stream()
                //.filter(entrada -> entrada.getEventoId() == eventoId) // Assuming Entrada has a getEventoId() method
                .collect(Collectors.toList());
    }

    public boolean validaCodigo(Entrada entrada, String codigo) {
        // This is a mock implementation. A real implementation would depend on how the code is generated and stored.
        return true;
    }
}
