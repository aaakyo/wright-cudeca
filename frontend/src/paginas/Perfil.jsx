import React from 'react';
import { Link } from 'react-router-dom';
import '../cudeca.css'; 

const Perfil = () => {
  return (
    <div className="pagina">
      {/* 1. BARRA DE NAVEGACIÓN */}
      <nav className="barra-navegacion">
        <div className="logo">
           {/* Usa una etiqueta img si tienes el logo, aquí pongo texto por ahora */}
           <h2 style={{margin:0, color:'#00b050', fontWeight:'800', fontSize:'28px'}}>cudeca</h2>
        </div>
        <div className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/entradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          {/* La clase enlace-verde pone el texto en verde y negrita */}
          <Link to="/perfil" className="enlace-verde">Perfil</Link>
          <Link to="/logout">Cerrar sesión</Link>
        </div>
      </nav>

      {/* 2. CABECERA: Título y Botón Editar */}
      <div className="cabecera-perfil-top">
        <h1 className="titulo-pagina">Mi perfil</h1>
        <button className="btn-editar-top">Editar perfil</button>
      </div>

      {/* 3. TARJETA PRINCIPAL BLANCA */}
      <div className="tarjeta-perfil-container">
        
        {/* COLUMNA IZQUIERDA: FOTO Y DATOS */}
        <div className="perfil-columna-izq">
          <div className="avatar-grande">
            <span className="avatar-icono">👤</span> 
          </div>
          <div className="nombre-perfil">Nombre Apellido</div>

          <div className="inputs-perfil-lista">
            <input type="text" className="input-gris" value="nombreapellido@gmail.com" readOnly />
            <input type="text" className="input-gris" value="Avd. Nombre, 01, 3x" readOnly />
            <input type="text" className="input-gris" value="722 01 01 01" readOnly />
          </div>
        </div>

        {/* COLUMNA DERECHA: LISTA DE EVENTOS */}
        <div className="perfil-columna-der">
          <h3 className="subtitulo-seccion">Mis eventos</h3>

          <div className="lista-eventos-scroll">
            
            {/* Evento 1: Pendiente */}
            <div className="evento-fila">
              <div className="evento-fecha-box">
                <span className="dia-grande">21</span>
                <span className="mes-peque">DIC</span>
              </div>
              <div className="evento-detalles">
                <div className="evento-nombre">Cena Benéfica Navideña</div>
                <div className="evento-horario">19:00-22:00</div>
              </div>
              <div className="etiqueta etiqueta-pendiente">Pendiente</div>
            </div>

            {/* Evento 2: Cancelado */}
            <div className="evento-fila">
              <div className="evento-fecha-box">
                <span className="dia-grande">16</span>
                <span className="mes-peque">NOV</span>
              </div>
              <div className="evento-detalles">
                <div className="evento-nombre">Concierto Benéfico</div>
                <div className="evento-horario">16:00-21:00</div>
              </div>
              <div className="etiqueta etiqueta-cancelado">Cancelado</div>
            </div>

            {/* Evento 3: Acabado */}
            <div className="evento-fila">
              <div className="evento-fecha-box">
                <span className="dia-grande">9</span>
                <span className="mes-peque">OCT</span>
              </div>
              <div className="evento-detalles">
                <div className="evento-nombre">Charla UMA</div>
                <div className="evento-horario">17:00-18:00</div>
              </div>
              <div className="etiqueta etiqueta-acabado">Acabado</div>
            </div>

          </div>

          <div className="link-descubre">
            Descubre más <a href="/eventos">eventos</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Perfil;