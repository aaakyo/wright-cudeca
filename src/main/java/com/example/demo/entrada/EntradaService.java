package com.example.demo.entrada;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Entrada getEntrada(int id) {
        return entradaRepository.findById(id).orElse(null);
    }

    public List<Entrada> getEntradasPorUsuario(Long usuarioId) {
        return entradaRepository.findByUsuarioId(usuarioId);
    }
}