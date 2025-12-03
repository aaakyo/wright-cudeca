import React from 'react';
import { Link } from 'react-router-dom';
import '../cudeca.css';

function Home() {
  return (
    <div className="pagina">
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <a href="#">Mis entradas</a>
          
          {/* Mantenemos TU enlace de Eventos */}
          <Link to="/eventos">Eventos</Link>
          
          <a href="#">Perfil</a>
          {/* Aceptamos el cambio de tu compañero: ahora lleva al Login real */}
          <Link to="/login" className="enlace-verde">Iniciar Sesión</Link>
        </nav>
        
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Fundación Cudeca" height="60" />
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">¡BIENVENIDO A CUDECA!</h1>
        </div>
      </section>

      {/* 3. SECCIÓN INFO */}
      <section className="info-section">
        <div className="info-columna">
          <h2 className="info-titulo">
            <span className="texto-destacado">Tú</span> marcas la diferencia
          </h2>
          <p style={{fontSize: '18px', lineHeight: '1.6', color: '#333'}}>
            El 100% de los beneficios van destinados a los cuidados paliativos. 
            Gracias a ti, podemos seguir aquí.
          </p>
        </div>
        
        <div className="info-columna" style={{textAlign: 'center'}}>
          <h2 className="info-titulo">Forma parte de nuestra comunidad</h2>
          <Link to="/registro" className="btn-registro-home">
            ¡Regístrate!
          </Link>
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