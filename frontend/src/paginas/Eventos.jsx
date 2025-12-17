import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../estilos/cudeca.css"; 

function Eventos() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // 1. COMPROBAR SI HAY USUARIO LOGUEADO
    const userString = localStorage.getItem('usuarioLogueado');
    if (userString) {
      setUsuario(JSON.parse(userString));
    }

    // 2. CARGAR EVENTOS DE LA BBDD
    fetch('http://localhost:8080/api/eventos')
      .then(response => response.json())
      .then(data => {
        setEventos(data);
      })
      .catch(error => console.error("Error cargando eventos:", error));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
    navigate('/');
  };

  const eventosFiltrados = eventos.filter(evento =>
    evento.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pagina">
      
      {/* HEADER */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos" className="enlace-verde" style={{textDecoration:'underline'}}>Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          
          {usuario ? (
            <span onClick={cerrarSesion} style={{cursor:'pointer', marginLeft:'20px', color:'#666', fontWeight:'bold'}}>
              Cerrar sesión
            </span>
          ) : (
            <Link to="/login">Iniciar sesión</Link>
          )}
        </nav>
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Cudeca" height="60" />
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido-eventos">
        <div className="contenedor-lista-eventos">
          
          {/* Cabecera de la lista + Buscador */}
          <div className="cabecera-lista">
            <h1>Lista de eventos</h1>
            <div className="buscador">
                <input
                  type="text"
                  placeholder="Buscar evento por nombre..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <span className="lupa">🔍</span>
            </div>
          </div>

          {/* LISTA CON SCROLL */}
          <div className="lista-scroll">
            {eventosFiltrados.map((evento) => (
              
              <div key={evento.id} className="tarjeta-evento"> 
                
                <div className="evento-img-wrapper">
                   <img 
                     src={evento.imagen ? `/recursos/${evento.imagen}` : "https://via.placeholder.com/300"} 
                     alt={evento.nombre} 
                   />
                </div>
                
                <div className="evento-fecha">
                  <span className="dia">
                    {evento.fechaInicio ? new Date(evento.fechaInicio).getDate() : '??'}
                  </span>
                  <span className="mes">
                    {evento.fechaInicio ? new Date(evento.fechaInicio).toLocaleString('es-ES', { month: 'short' }).replace('.', '') : '...'}
                  </span>
                </div>

                <div className="evento-info">
                  <h3 className="evento-titulo">{evento.nombre}</h3>
                  <p className="evento-desc">
                    {evento.descripcion || "Evento solidario de la Fundación Cudeca."}
                  </p>
                  <div className="evento-meta">
                    <span>📍 {evento.lugar}</span>
                    <span>🕒 {evento.hora || evento.horaInicio || "Hora s/c"}</span>
                    {evento.precio !== null && <span>💶 {evento.precio}€</span>}
                  </div>
                </div>

                <div className="evento-accion">
                  <Link to={`/comprar/${evento.id}`}>
                    <button className="btn-comprar">Comprar entrada</button>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Eventos;