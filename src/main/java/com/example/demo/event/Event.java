package com.example.demo.event;

import com.example.demo.asiento.Asiento;
import com.example.demo.entrada.Entrada;
import com.example.demo.entrada.TipoEntrada;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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
    private List<Entrada> listaEntradas;
    private boolean oculto;
    private int metaRecaudacion;
    private TipoEntrada tipoEntrada;
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
        oculto = true;
        listaEntradas = new ArrayList<>();

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

