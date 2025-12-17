import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../estilos/cudeca.css";
import "../estilos/ResultadoCompra.css";

function ResultadoCompra() {
  const location = useLocation();
  // Recibimos los datos de la "mochila" (state) que envió ComprarEntrada
  const { estado, datos } = location.state || {}; 

  // Protección: Si alguien entra poniendo la URL a mano sin comprar
  if (!estado) {
    return (
      <div className="pagina">
        <header className="barra-navegacion">
            <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60"/></div>
        </header>
        <main className="resultado-main">
          <div className="tarjeta-resultado">
            <div className="icono-resultado">❓</div>
            <h1 className="titulo-resultado">Acceso no válido</h1>
            <p className="mensaje-resultado">No hemos encontrado información de una compra reciente.</p>
            <Link to="/eventos" className="btn-volver">Ir a Eventos</Link>
          </div>
        </main>
      </div>
    );
  }

  // --- VISTA DE ÉXITO ---
  if (estado === 'exito') {
    return (
      <div className="pagina">
        <header className="barra-navegacion">
            <nav className="enlaces-navegacion">
                <Link to="/">Inicio</Link>
                <Link to="/misentradas">Mis entradas</Link>
                <Link to="/eventos">Eventos</Link>
                <Link to="/perfil">Perfil</Link>
            </nav>
            <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60"/></div>
        </header>

        <main className="resultado-main">
          <div className="tarjeta-resultado exito">
            <div className="icono-resultado">✅</div>
            <h1 className="titulo-resultado">¡Compra Exitosa!</h1>
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
              {datos.asientos && (
                  <div className="detalle-fila">
                    <span>Asientos:</span>
                    <strong>{datos.asientos}</strong>
                  </div>
              )}
              <div className="detalle-fila total">
                <span>Total pagado:</span>
                <strong>{datos.total}€</strong>
              </div>

              <div className="info-extra">
                <p>
                  Puedes consultar tus entradas en el apartado <Link to="/misentradas">Mis entradas</Link> o en tu correo electrónico.
                </p>
                <small>
                  * Si has realizado la compra sin cuenta registrada, revisa tu bandeja de entrada (o spam).
                </small>
              </div>

            </div>

            <Link to="/eventos" className="btn-volver">Volver a Eventos</Link>
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
          <div className="tarjeta-resultado error">
            <div className="icono-resultado">❌</div>
            <h1 className="titulo-resultado">¡Ups! Algo salió mal</h1>
            <p className="mensaje-resultado">
              No hemos podido procesar tu pago. Por favor, inténtalo más tarde.
            </p>
            {datos.error && <p className="error-tecnico">Detalle: {datos.error}</p>}
            
            <Link to="/eventos" className="btn-volver btn-error">Intentar de nuevo</Link>
          </div>
        </main>
    </div>
  );
}

export default ResultadoCompra;