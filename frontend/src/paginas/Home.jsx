import React from 'react';
import { Link } from 'react-router-dom';
import '../cudeca.css';

function Home() {
  return (
    <div className="pagina">
      {/* BARRA DE NAVEGACIÓN */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          {/* Link es como un <a> pero instantáneo */}
          <Link to="/" className="enlace-activo">Inicio</Link>
          <a href="#">Mis entradas</a>
          <a href="#">Eventos</a>
          <a href="#">Perfil</a>
          <Link to="/registro">Iniciar sesión</Link>
        </nav>
      </header>

      {/* CONTENIDO TEMPORAL DE LA HOME */}
      <main className="contenido" style={{flexDirection: 'column', textAlign: 'center'}}>
        <h1 className="titulo-formulario" style={{fontSize: '50px'}}>Bienvenido a CUDECA</h1>
        <p className="subtitulo-formulario">Esta es la página principal (Home)</p>
        
        {/* Este botón nos lleva al registro */}
        <Link to="/registro">
            <button className="boton-siguiente" style={{width: '200px'}}>
                Ir a Registrarse
            </button>
        </Link>
      </main>
    </div>
  );
}

export default Home;