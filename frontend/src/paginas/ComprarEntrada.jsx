import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../estilos/cudeca.css"; 
import "../estilos/ComprarEntrada.css"; 

// Datos simulados (coinciden con Eventos.jsx)
const eventosData = [
  { id: 1, titulo: "COCKTAIL BENÉFICO COTTON CLUB", precio: 80, fecha: "12 DIC 2025", img: "/recursos/evento1.jpg" },
  { id: 2, titulo: "GALA BENÉFICA «JAMES BOND» DEL ROTARY CLUB MARBELLA-GUADALMINA", precio: 125, fecha: "2 MAY 2025", img: "/recursos/evento2.jpg" },
  { id: 3, titulo: "CAMINATA SOLIDARIA POR LA VIDA", precio: 10, fecha: "05 ENE 2026", img: "/recursos/evento3.jpg" }
];

function ComprarEntrada() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para cambiar de página
  const [evento, setEvento] = useState(null);

  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', email: '', telefono: '', direccion: '', dni: '', donacion: ''
  });

  // Cargar el evento correcto según la URL
  useEffect(() => {
    const eventoEncontrado = eventosData.find(e => e.id === parseInt(id));
    setEvento(eventoEncontrado);
  }, [id]);

  // Función para actualizar el estado cuando escribes en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN PRINCIPAL DE COMPRA (MODO DEMO) ---
  const realizarCompra = (e) => {
    e.preventDefault();

    // Ventana emergente para que tú elijas qué quieres enseñar
    const quiereExito = window.confirm(
        "🛠 MODO DEMO 🛠\n\n¿Qué resultado quieres simular?\n\n✅ ACEPTAR = Compra Exitosa\n❌ CANCELAR = Error en el pago"
    );

    if (quiereExito) {
        // --- CASO 1: ÉXITO ---
        // Asiento aleatorio
        const fila = 5
        const asiento = 10
        
        // Navegamos a la pantalla de resultado enviando los datos
        navigate('/resultado', {
            state: {
                estado: 'exito',
                datos: {
                    usuario: formData.nombre || "Usuario",
                    evento: evento.titulo,
                    fecha: evento.fecha,
                    total: evento.precio + (Number(formData.donacion) || 0),
                    asientos: `Fila ${fila} - Asiento ${asiento}`
                }
            }
        });
    } else {
        // --- CASO 2: ERROR ---
        navigate('/resultado', {
            state: {
                estado: 'error',
                datos: {
                    error: "Fondos insuficientes (Simulación seleccionada)."
                }
            }
        });
    }
  };

  if (!evento) return <div className="pagina">Cargando evento...</div>;

  return (
    <div className="pagina">
      {/* HEADER */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos" className="enlace-verde" style={{ textDecoration: 'underline' }}>Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/registro">Iniciar sesión</Link>
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
                  name="donacion"
                  className="input-gris" 
                  placeholder="0€"
                  value={formData.donacion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO + FORMULARIO */}
          <div className="col-derecha">
            
            <div className="header-evento">
              <div className="box-fecha">
                <div className="box-fecha-top">Evento</div>
                <div className="box-fecha-num">{evento.fecha.split(" ")[0]}</div>
                <div className="box-fecha-bot">{evento.fecha.split(" ")[1]} 2025</div>
              </div>

              <div className="info-titulo-precio">
                <h2>{evento.titulo}</h2>
                <div className="precio-texto">Precio: {evento.precio}€</div>
              </div>
            </div>

            <form className="formulario-compra">
              <div className="campo">
                <label>Nombre:</label>
                <input type="text" name="nombre" className="input-gris" onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" className="input-gris" onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Email:</label>
                <input type="email" name="email" className="input-gris" onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Teléfono:</label>
                <input type="tel" name="telefono" className="input-gris" onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Dirección:</label>
                <input type="text" name="direccion" className="input-gris" onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Dni:</label>
                <input type="text" name="dni" className="input-gris" onChange={handleChange} />
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
              {/* Botón único que lanza la pregunta de confirmación */}
              <button className="btn-comprar-final" onClick={realizarCompra}>Comprar</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ComprarEntrada;