package com.example.demo.asiento;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Asiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int precio;
    private int numero;
    private int eventoId;

    public Asiento() {
    }

    public Asiento(int precio, int numero, int eventoId) {
        this.precio = precio;
        this.numero = numero;
        this.eventoId = eventoId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public int getEventoId() {
        return eventoId;
    }

    public void setEventoId(int eventoId) {
        this.eventoId = eventoId;
    }

    @Override
    public String toString() {
        return "Asiento{" +
                "id=" + id +
                ", precio=" + precio +
                ", numero=" + numero +
                ", eventoId=" + eventoId +
                '}';
    }
}
