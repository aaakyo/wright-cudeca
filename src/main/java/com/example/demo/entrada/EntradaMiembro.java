package com.example.demo.entrada;

import jakarta.persistence.Entity;

@Entity
public class EntradaMiembro extends Entrada {

    private int usuarioId;

    public EntradaMiembro() {
        super();
    }

    public EntradaMiembro(int donacionExtra, boolean pagada, boolean cancelada, int usuarioId) {
        super(donacionExtra, pagada, cancelada);
        this.usuarioId = usuarioId;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public String toString() {
        return "EntradaMiembro{" +
                "usuarioId=" + usuarioId +
                "} " + super.toString();
    }
}
