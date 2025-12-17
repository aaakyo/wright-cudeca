package com.example.demo.entrada;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // --- DATOS DEL COMPRADOR ---
    private Long usuarioId; // Null si es invitado
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
    // ---------------------------

    private Long eventoId;
    private int donacionExtra;
    private boolean pagada;
    private boolean cancelada;

    public Entrada() {
    }

    public Entrada(Long usuarioId, Long eventoId, String nombre, String apellidos, String email, String telefono, int donacionExtra, boolean pagada) {
        this.usuarioId = usuarioId;
        this.eventoId = eventoId;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.donacionExtra = donacionExtra;
        this.pagada = pagada;
        this.cancelada = false;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Long getEventoId() { return eventoId; }
    public void setEventoId(Long eventoId) { this.eventoId = eventoId; }

    public int getDonacionExtra() { return donacionExtra; }
    public void setDonacionExtra(int donacionExtra) { this.donacionExtra = donacionExtra; }

    public boolean isPagada() { return pagada; }
    public void setPagada(boolean pagada) { this.pagada = pagada; }

    public boolean isCancelada() { return cancelada; }
    public void setCancelada(boolean cancelada) { this.cancelada = cancelada; }
}