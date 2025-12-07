package com.example.demo.entrada;

import jakarta.persistence.Entity;

@Entity
public class EntradaAnonima extends Entrada {

    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String direccionPostal;

    public EntradaAnonima() {
        super();
    }

    public EntradaAnonima(int donacionExtra, boolean pagada, boolean cancelada, String nombre, String apellido, String email, String telefono, String direccionPostal) {
        super(donacionExtra, pagada, cancelada);
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.direccionPostal = direccionPostal;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccionPostal() {
        return direccionPostal;
    }

    public void setDireccionPostal(String direccionPostal) {
        this.direccionPostal = direccionPostal;
    }

    @Override
    public String toString() {
        return "EntradaAnonima{"
                + "nombre='" + nombre + '\''
                + ", apellido='" + apellido + '\''
                + ", email='" + email + '\''
                + ", telefono='" + telefono + '\''
                + ", direccionPostal='" + direccionPostal + '\''
                + "} " + super.toString();
    }
}
