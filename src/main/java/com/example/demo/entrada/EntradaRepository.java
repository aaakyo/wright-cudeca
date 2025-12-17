package com.example.demo.entrada;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Integer> {
    // ¡Magia! Spring crea el SQL solo con leer el nombre del método
    List<Entrada> findByUsuarioId(Long usuarioId);
}