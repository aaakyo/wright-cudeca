package com.example.demo.entrada;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int donacionExtra;
    private boolean pagada;
    private boolean cancelada;

    public Entrada() {
    }

    public Entrada(int donacionExtra, boolean pagada, boolean cancelada) {
        this.donacionExtra = donacionExtra;
        this.pagada = pagada;
        this.cancelada = cancelada;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDonacionExtra() {
        return donacionExtra;
    }

    public void setDonacionExtra(int donacionExtra) {
        this.donacionExtra = donacionExtra;
    }

    public boolean isPagada() {
        return pagada;
    }

    public void setPagada(boolean pagada) {
        this.pagada = pagada;
    }

    public boolean isCancelada() {
        return cancelada;
    }

    public void setCancelada(boolean cancelada) {
        this.cancelada = cancelada;
    }

    @Override
    public String toString() {
        return "Entrada{" +
                "id=" + id +
                ", donacionExtra=" + donacionExtra +
                ", pagada=" + pagada +
                ", cancelada=" + cancelada +
                '}';
    }
}