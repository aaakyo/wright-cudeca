import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/perfilAdmin.css";

const PerfilAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // 1. Cargar datos del Admin
    const userString = localStorage.getItem('usuarioLogueado');
    if (userString) {
      const user = JSON.parse(userString);
      setAdmin(user);

      // 2. Cargar la lista de eventos REALES
      fetch('http://localhost:8080/api/eventos')
        .then(res => res.json())
        .then(data => setEventos(data)) // Guardamos los eventos en el estado
        .catch(err => console.error(err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Función para borrar un evento
  const borrarEvento = async (idEvento) => {
    if(!window.confirm("¿Seguro que quieres borrar este evento?")) return;

    try {
        // Recordamos que tu backend pide el usuarioId para borrar
        await fetch(`http://localhost:8080/api/eventos/${idEvento}?usuarioId=${admin.id}`, {
            method: 'DELETE'
        });
        // Actualizamos la lista visualmente quitando el evento borrado
        setEventos(eventos.filter(e => e.id !== idEvento));
        alert("Evento eliminado");
    } catch (error) {
        console.error(error);
        alert("Error al eliminar");
    }
  };

  // Ayuda para formatear la fecha (2025-12-21 -> 21 DIC)
  const formatearFecha = (fechaString) => {
      if(!fechaString) return { dia: '??', mes: '...'};
      const fecha = new Date(fechaString);
      const dia = fecha.getDate();
      const mes = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
      return { dia, mes };
  };

  if (!admin) return <div>Cargando panel...</div>;

  return (
    <div className="pagina-admin">
      {/* --- BARRA DE NAVEGACIÓN --- */}
      <nav className="barra-navegacion">
        <div className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil" className="enlace-verde">Perfil</Link>
          <Link to="/logout">Cerrar sesión</Link>
        </div>
        <div className="logo">
          <img src="/recursos/cudecaLogo.png" alt="Logo Cudeca" style={{ height: "50px" }} />
        </div>
      </nav>

      <main className="admin-main">
        
        {/* CABECERA */}
        <div className="admin-header">
          <h1>Panel de Control</h1>
          <div style={{display:'flex', gap:'10px'}}>
             {/* Este botón nos lleva al formulario de crear que hicimos antes */}
             <Link to="/admin"> 
                <button className="btn-admin-vista" style={{backgroundColor:'#02b557', color:'white', border:'none'}}>
                    + Crear Nuevo Evento
                </button>
             </Link>
             <Link to="/perfil">
                <button className="btn-admin-vista">Volver a Perfil</button>
             </Link>
          </div>
        </div>

        <div className="admin-panel">
          
          {/* --- IZQUIERDA: DATOS DEL ADMIN --- */}
          <div className="admin-left">
            <div className="admin-avatar">
              <span className="admin-avatar-icon">👤</span>
            </div>
            {/* Datos reales del LocalStorage */}
            <div className="admin-name">{admin.nombre} {admin.apellidos}</div>
            <p className="admin-email">{admin.email}</p>
            <p style={{fontSize:'12px', color:'#999', marginTop:'10px'}}>Rol: Administrador</p>
          </div>

          {/* --- DERECHA: LISTA DE EVENTOS --- */}
          <div className="admin-right">
            <h3 className="admin-right-title">Gestionar eventos activos ({eventos.length})</h3>

            <div className="admin-event-list">
              
              {eventos.length === 0 ? (
                  <p style={{padding:'20px', color:'#666'}}>No hay eventos creados todavía.</p>
              ) : (
                  eventos.map(evento => {
                    const { dia, mes } = formatearFecha(evento.fechaInicio);
                    
                    return (
                      <div key={evento.id} className="admin-event-row">
                        <div className="admin-event-date">
                          <span className="admin-event-day">{dia}</span>
                          <span className="admin-event-month">{mes}</span>
                        </div>
                        <div className="admin-event-info">
                          <div className="admin-event-name">
                            {evento.nombre}
                          </div>
                          <div className="admin-event-time">
                              {evento.horaInicio ? evento.horaInicio.substring(0,5) : '??:??'} 
                              {' - '}
                              {evento.lugar}
                          </div>
                        </div>
                        <div className="admin-event-actions">
                          {/* Badge dinámico */}
                          <span className={`badge-estado ${evento.oculto ? 'badge-privado' : 'badge-publico'}`}>
                              {evento.precio > 0 ? `${evento.precio}€` : 'Gratis'}
                          </span>
                          
                          {/* Botón de borrar real */}
                          <button 
                            className="btn-gestionar" 
                            style={{backgroundColor:'#ff4d4d', color:'white', border:'none'}}
                            onClick={() => borrarEvento(evento.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilAdmin;