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

              {/* CAMBIO: Hemos quitado la caja de asientos y puesto el texto informativo */}
              <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
                  Puedes consultar tus entradas en el apartado <Link to="/entradas" style={{ color: '#02b557', fontWeight: 'bold', textDecoration: 'underline' }}>Mis entradas</Link> o en tu correo electrónico.
                </p>
                
                <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                  * Si has realizado la compra sin cuenta registrada, revisa tu bandeja de entrada (o spam) para descargar las entradas.
                </p>
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