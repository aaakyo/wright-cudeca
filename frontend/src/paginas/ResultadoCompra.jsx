import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../estilos/cudeca.css";
import "../estilos/ResultadoCompra.css";

function ResultadoCompra() {
  const location = useLocation();
  // Recibimos los datos enviados desde la navegación
  const { estado, datos } = location.state || {}; 

  // Si alguien intenta entrar directo por URL sin comprar, mostramos error genérico
  if (!estado) {
    return (
      <div className="pagina">
        <div className="resultado-main">
          <div className="tarjeta-resultado">
            <div className="icono-resultado">❓</div>
            <h1 className="titulo-resultado">Acceso no válido</h1>
            <p className="mensaje-resultado">No hemos encontrado información de compra reciente.</p>
            <Link to="/" className="btn-volver">Volver al inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DE ÉXITO ---
  if (estado === 'exito') {
    return (
      <div className="pagina">
        <header className="barra-navegacion">
            <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60"/></div>
        </header>

        <main className="resultado-main">
          <div className="tarjeta-resultado">
            <div className="icono-resultado">✅</div>
            <h1 className="titulo-resultado" style={{color: '#02b557'}}>¡Compra Exitosa!</h1>
            <p className="mensaje-resultado">
              Gracias <strong>{datos.usuario}</strong>, hemos procesado tu pedido correctamente.
              Has recibido un email con la confirmación.
            </p>

            <div className="detalles-compra">
              <div className="detalle-fila">
                <span>Evento:</span>
                <strong>{datos.evento}</strong>
              </div>
              <div className="detalle-fila">
                <span>Fecha:</span>
                <strong>{datos.fecha}</strong>
              </div>
              <div className="detalle-fila">
                <span>Total pagado:</span>
                <strong>{datos.total}€</strong>
              </div>

              {/* Caja de Asientos Simulados */}
              <div className="asientos-box">
                <span className="asientos-titulo">Tus Asientos Asignados</span>
                <span className="asientos-nums">{datos.asientos}</span>
              </div>
            </div>

            <Link to="/" className="btn-volver">Volver al Inicio</Link>
          </div>
        </main>
      </div>
    );
  }

  // --- VISTA DE ERROR ---
  return (
    <div className="pagina">
        <header className="barra-navegacion">
            <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60"/></div>
        </header>
        <main className="resultado-main">
          <div className="tarjeta-resultado">
            <div className="icono-resultado">❌</div>
            <h1 className="titulo-resultado texto-error">¡Ups! Algo salió mal</h1>
            <p className="mensaje-resultado">
              No hemos podido procesar tu pago. Por favor, revisa tus datos o inténtalo más tarde.
            </p>
            {datos.error && <p style={{color:'red', fontSize:'14px'}}>Error: {datos.error}</p>}
            
            <Link to={`/eventos`} className="btn-volver btn-error">Intentar de nuevo</Link>
          </div>
        </main>
    </div>
  );
}

export default ResultadoCompra;