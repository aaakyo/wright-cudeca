package com.example.demo.event;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.asiento.Asiento;
import com.example.demo.entrada.Entrada;
import com.example.demo.entrada.TipoEntrada;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nombre;
    private String lugar;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String descripcion;
    private String imagen; 

    // --- 1. AÑADIDO AQUÍ ---
    private Double precio;
    // -----------------------

    @OneToMany(cascade = CascadeType.ALL)
    private List<Entrada> listaEntradas;
    private boolean oculto;
    private int metaRecaudacion;
    private TipoEntrada tipoEntrada;
    
    @OneToMany(cascade = CascadeType.ALL) 
    private List<Asiento> asientos;

    public Event() {}

    public Event(String nombre,
                 String lugar,
                 LocalDate fechaInicio,
                 LocalDate fechaFin,
                 LocalTime horaInicio,
                 LocalTime horaFin,
                 String descripcion,
                 int metaRecaudacion,
                 Double precio, // --- 2. AÑADIDO AL CONSTRUCTOR ---
                 TipoEntrada tipoEntrada,
                 List<Asiento> asientos) {

        this.nombre = nombre;
        this.lugar = lugar;
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.descripcion = descripcion;
        this.horaFin = horaFin;
        this.horaInicio = horaInicio;
        this.asientos = asientos;
        this.tipoEntrada = tipoEntrada;
        this.metaRecaudacion = metaRecaudacion;
        this.precio = precio; // --- Y ASIGNADO AQUÍ ---
        oculto = true;
        listaEntradas = new ArrayList<>();
    }

    // --- 3. GETTERS Y SETTERS ---

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public int getMetaRecaudacion() {
        return metaRecaudacion;
    }

    public List<Asiento> getAsientos() {
        return asientos;
    }

    public List<Entrada> getListaEntradas() {
        return listaEntradas;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public long getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getLugar() {
        return lugar;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoEntrada getTipoEntrada() {
        return tipoEntrada;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setAsientos(List<Asiento> asientos) {
        this.asientos = asientos;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setListaEntradas(List<Entrada> listaEntradas) {
        this.listaEntradas = listaEntradas;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public void setMetaRecaudacion(int metaRecaudacion) {
        this.metaRecaudacion = metaRecaudacion;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setOculto(boolean oculto) {
        this.oculto = oculto;
    }

    public void setTipoEntrada(TipoEntrada tipoEntrada) {
        this.tipoEntrada = tipoEntrada;
    }
}