import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/cudeca.css";

function Home() {
  const [usuario, setUsuario] = useState(null);

  // 1. Al cargar la página, miramos si hay alguien en la "mochila"
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // 2. Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado'); // Borramos la mochila
    setUsuario(null); // Actualizamos la pantalla
    window.location.reload(); // Recargamos para limpiar todo rastro
  };

  return (
    <div className="pagina">
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          
          {usuario ? (
            /* Si hay usuario, mostramos CERRAR SESIÓN */
            <span 
                onClick={cerrarSesion} 
                className="enlace-verde" 
                style={{cursor: 'pointer'}}
            >
                Cerrar sesión
            </span>
          ) : (
            /* Si NO hay usuario, mostramos INICIAR SESIÓN */
            <Link to="/login" className="enlace-verde">Iniciar sesión</Link>
          )}
        
        </nav>
        
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Fundación Cudeca" height="60" />
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
            {/* Pequeño detalle: Si está logueado, le saludamos */}
            <h1 className="hero-title">
                {usuario ? `¡HOLA, ${usuario.nombre.toUpperCase()}!` : "¡BIENVENIDO A CUDECA!"}
            </h1>
        </div>
      </section>

      {/* 3. SECCIÓN INFO */}
      <section className="info-section">
        {/* Columna Izquierda */}
        <div className="info-columna">
          <h2 className="info-titulo">
            <span className="texto-destacado">Tú</span> marcas la diferencia
          </h2>
          <p style={{fontSize: '18px', lineHeight: '1.6', color: '#333'}}>
            El 100% de los beneficios van destinados a los cuidados paliativos. 
            Gracias a ti, podemos seguir aquí.
          </p>
        </div>
        
        {/* Columna Derecha */}
        <div className="info-columna" style={{textAlign: 'center'}}>
          <h2 className="info-titulo">Forma parte de nuestra comunidad</h2>
          
          {/* Si ya está registrado, le invitamos a ver eventos en lugar de registrarse otra vez */}
          {usuario ? (
              <Link to="/eventos" className="btn-registro-home">
                Ver Eventos
              </Link>
          ) : (
              <Link to="/registro" className="btn-registro-home">
                ¡Regístrate!
              </Link>
          )}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="footer">
        <div className="footer-iconos">
           <span>📸 @fundacioncudeca</span>
           <span>📞 952 564 910</span>
           <span>✉️ instituto@cudeca.org</span>
        </div>
        
        <div className="footer-links">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos y condiciones</a>
        </div>
      </footer>

    </div>
  );
}

export default Home;