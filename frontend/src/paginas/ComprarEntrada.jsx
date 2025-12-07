import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../estilos/cudeca.css"; // Estilos globales (header, etc)
import "../estilos/ComprarEntrada.css"; // Estilos específicos de esta página

// Simulación de base de datos (mismos datos que en Eventos.jsx para que coincida)
const eventosData = [
  { id: 1, titulo: "COCKTAIL BENÉFICO COTTON CLUB", precio: 80, fecha: "12 DIC 2025", img: "/recursos/evento1.jpg" },
  { id: 2, titulo: "GALA BENÉFICA «JAMES BOND» DEL ROTARY CLUB MARBELLA-GUADALMINA", precio: 125, fecha: "2 MAY 2025", img: "/recursos/evento2.jpg" },
  { id: 3, titulo: "CAMINATA SOLIDARIA POR LA VIDA", precio: 10, fecha: "05 ENE 2026", img: "/recursos/evento3.jpg" }
];

function ComprarEntrada() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [evento, setEvento] = useState(null);

  // Formulario
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', email: '', telefono: '', direccion: '', dni: '', donacion: ''
  });

  useEffect(() => {
    // Buscar el evento correspondiente al ID
    const eventoEncontrado = eventosData.find(e => e.id === parseInt(id));
    setEvento(eventoEncontrado);
  }, [id]);

  if (!evento) return <div className="pagina">Cargando evento...</div>;

  return (
    <div className="pagina">
      {/* HEADER (Reutilizado) */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos" className="enlace-verde" style={{ textDecoration: 'underline' }}>Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/registro">Cerrar sesión</Link>
        </nav>
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Cudeca" height="60" />
        </div>
      </header>

      <main className="compra-main">
        <div className="compra-card">
          
          {/* COLUMNA IZQUIERDA: IMAGEN + DONACIÓN */}
          <div className="col-izquierda">
            <div className="poster-wrapper">
              {/* Usamos una imagen real o placeholder si falla */}
              <img 
                src={evento.img} 
                alt={evento.titulo} 
                onError={(e) => e.target.src = 'https://via.placeholder.com/300x450'}
              />
            </div>
            
            <div className="donacion-extra">
              <span className="donacion-label">¿Quieres aportar una donación extra?</span>
              <div className="donacion-input-group">
                <label>Importe:</label>
                <input 
                  type="number" 
                  className="input-gris" 
                  placeholder="0€"
                  value={formData.donacion}
                  onChange={(e) => setFormData({...formData, donacion: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: DATOS + FORMULARIO */}
          <div className="col-derecha">
            
            <div className="header-evento">
              {/* Caja de fecha estilo calendario */}
              <div className="box-fecha">
                <div className="box-fecha-top">Evento</div>
                <div className="box-fecha-num">{evento.fecha.split(" ")[0]}</div> {/* Extrae el día */}
                <div className="box-fecha-bot">{evento.fecha.split(" ")[1]} 2025</div> {/* Mes y Año */}
              </div>

              <div className="info-titulo-precio">
                <h2>{evento.titulo}</h2>
                <div className="precio-texto">Precio: {evento.precio}€</div>
              </div>
            </div>

            <form className="formulario-compra">
              <div className="campo">
                <label>Nombre:</label>
                <input type="text" className="input-gris" />
              </div>
              <div className="campo">
                <label>Apellidos:</label>
                <input type="text" className="input-gris" />
              </div>
              <div className="campo">
                <label>Email:</label>
                <input type="email" className="input-gris" />
              </div>
              <div className="campo">
                <label>Teléfono:</label>
                <input type="tel" className="input-gris" />
              </div>
              <div className="campo">
                <label>Dirección:</label>
                <input type="text" className="input-gris" />
              </div>
              <div className="campo">
                <label>Dni:</label>
                <input type="text" className="input-gris" />
              </div>
            </form>

            <div className="checkboxes-legales">
              <label className="checkbox-row">
                <input type="checkbox" /> Acepto que CUDECA use mis datos para enviarme publicidad
              </label>
              <label className="checkbox-row">
                <input type="checkbox" /> Acepto que CUDECA use estos datos para generar un certificado de donación
              </label>
            </div>

            <div className="resumen-footer">
              <div className="col-resumen">
                <div className="resumen-item"><strong>Fecha:</strong> {evento.fecha}</div>
                <div className="resumen-item"><strong>Tipo entrada:</strong> Normal</div>
              </div>
              <div className="col-resumen">
                <div className="resumen-item"><strong>Nº entrada:</strong> XXXXXXXXX</div>
                <div className="resumen-item"><strong>Importe:</strong> {evento.precio + (Number(formData.donacion) || 0)}€</div>
              </div>
            </div>

            <div className="btn-container">
              <button className="btn-comprar-final">Comprar</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ComprarEntrada;