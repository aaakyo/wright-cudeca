import React from 'react';
import { Link } from 'react-router-dom';
import "../estilos/cudeca.css";

function Home() {
  return (
    <div className="pagina">
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          {/* Es recomendable usar Link en vez de 'a' para que no recargue la página */}
          <Link to="/entradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          
          {/* --- NUEVO: AÑADIMOS EL ENLACE A PERFIL --- */}
          <Link to="/perfil">Perfil</Link>
          
          {/* --- MANTENIDO: EL ENLACE A LOGIN --- */}
          <Link to="/LogIn" className="enlace-verde">Iniciar sesión</Link>
        
        </nav>
        
        <div className="logo">
           {/* Asegúrate de tener la imagen en la carpeta public/recursos */}
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