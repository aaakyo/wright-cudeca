// src/paginas/PerfilAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/perfilAdmin.css";

const PerfilAdmin = () => {
  return (
    <div className="pagina-admin">
      <nav className="barra-navegacion">
        <div className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil" className="enlace-verde">
            Perfil
          </Link>
          <Link to="/logout">Cerrar sesión</Link>
        </div>

        <div className="logo">
          <img
            src="/recursos/cudecaLogo.png"
            alt="Logo Cudeca"
            style={{ height: "50px" }}
          />
        </div>
      </nav>

      <main className="admin-main">
        <div className="admin-header">
          <h1>Opciones de administrador</h1>

          <Link to="/perfil">
            <button className="btn-admin-vista">Volver a vista de usuario</button>
          </Link>
        </div>

        <div className="admin-panel">
          <div className="admin-left">
            <div className="admin-avatar">
              <span className="admin-avatar-icon">👤</span>
            </div>
            <div className="admin-name">Administrador</div>
            <p className="admin-email">nombreapellido@gmail.com</p>
          </div>

          <div className="admin-right">
            <h3 className="admin-right-title">Gestionar eventos</h3>

            <div className="admin-event-list">
              <div className="admin-event-row">
                <div className="admin-event-date">
                  <span className="admin-event-day">21</span>
                  <span className="admin-event-month">DIC</span>
                </div>
                <div className="admin-event-info">
                  <div className="admin-event-name">
                    Cena Benéfica Navideña
                  </div>
                  <div className="admin-event-time">19:00-22:00</div>
                </div>
                <div className="admin-event-actions">
                  <span className="badge-estado badge-publico">Público</span>
                  <button className="btn-gestionar">Gestionar</button>
                </div>
              </div>

              <div className="admin-event-row">
                <div className="admin-event-date">
                  <span className="admin-event-day">16</span>
                  <span className="admin-event-month">NOV</span>
                </div>
                <div className="admin-event-info">
                  <div className="admin-event-name">Concierto Benéfico</div>
                  <div className="admin-event-time">16:00-21:00</div>
                </div>
                <div className="admin-event-actions">
                  <span className="badge-estado badge-publico">Público</span>
                  <button className="btn-gestionar">Gestionar</button>
                </div>
              </div>

              <div className="admin-event-row">
                <div className="admin-event-date">
                  <span className="admin-event-day">9</span>
                  <span className="admin-event-month">OCT</span>
                </div>
                <div className="admin-event-info">
                  <div className="admin-event-name">Charla UMA</div>
                  <div className="admin-event-time">17:00-18:00</div>
                </div>
                <div className="admin-event-actions">
                  <span className="badge-estado badge-privado">Privado</span>
                  <button className="btn-gestionar">Gestionar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilAdmin;
