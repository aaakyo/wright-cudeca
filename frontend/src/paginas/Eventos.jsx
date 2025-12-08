import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/cudeca.css";

// Datos de prueba (luego vendrán de la base de datos)
const eventosData = [
  {
    id: 1,
    titulo: "COCKTAIL BENÉFICO COTTON CLUB EN RESTAURANTE EL HIGUERÓN",
    descripcion: "Disfruta de una noche mágica ambientada en los años 20 con música en directo, cócteles exclusivos y la mejor compañía solidaria. Todo lo recaudado irá destinado a los cuidados paliativos de la fundación.",
    fechaDia: "12",
    fechaMes: "DIC",
    asistentes: 150,
    duracion: "3 horas",
    imagen: "/recursos/evento1.jpg" // Necesitarás poner una imagen aquí
  },
  {
    id: 2,
    titulo: "GALA BENÉFICA «JAMES BOND» DEL ROTARY CLUB MARBELLA",
    descripcion: "Una velada de etiqueta al más puro estilo 007. Cena de gala, subasta benéfica y baile. Misión: Ayudar a Cudeca. No te pierdas el evento más elegante del año.",
    fechaDia: "21",
    fechaMes: "NOV",
    asistentes: 300,
    duracion: "4 horas",
    imagen: "/recursos/evento2.jpg"
  },
  {
    id: 3,
    titulo: "CAMINATA SOLIDARIA POR LA VIDA",
    descripcion: "Únete a nosotros en este paseo familiar por el paseo marítimo. Deporte, salud y solidaridad se unen en una jornada inolvidable para todos los públicos.",
    fechaDia: "05",
    fechaMes: "ENE",
    asistentes: 500,
    duracion: "2 horas",
    imagen: "/recursos/evento3.jpg"
  }
];

function Eventos() {
  const [busqueda, setBusqueda] = useState("");

  // Filtramos los eventos según lo que escribas en el buscador
  const eventosFiltrados = eventosData.filter(evento => 
    evento.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pagina">
      {/* BARRA DE NAVEGACIÓN REUTILIZADA */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          {/* Marcamos Eventos como activo */}
          <Link to="/eventos" className="enlace-verde" style={{textDecoration: 'underline'}}>Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/registro">Iniciar sesión</Link>
        </nav>
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Cudeca" height="60" />
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido-eventos">
        <div className="contenedor-lista-eventos">
          
          {/* CABECERA DE LA LISTA (Título y Buscador) */}
          <div className="cabecera-lista">
            <h1>Lista de eventos</h1>
            <div className="buscador">
              <input 
                type="text" 
                placeholder="Buscar evento..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="lupa">🔍</span>
            </div>
          </div>

          {/* LISTA SCROLLABLE */}
          <div className="lista-scroll">
            {eventosFiltrados.map((evento) => (
              <div key={evento.id} className="tarjeta-evento">
                
                {/* 1. IMAGEN */}
                <div className="evento-img-wrapper">
                    {/* Placeholder si no hay imagen real aún */}
                    <img src={evento.imagen} alt={evento.titulo} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                </div>

                {/* 2. FECHA */}
                <div className="evento-fecha">
                  <span className="dia">{evento.fechaDia}</span>
                  <span className="mes">{evento.fechaMes}</span>
                </div>

                {/* 3. INFORMACIÓN */}
                <div className="evento-info">
                  <h3 className="evento-titulo">{evento.titulo}</h3>
                  <p className="evento-desc">{evento.descripcion}</p>
                  
                  <div className="evento-meta">
                    <span>👥 {evento.asistentes} asistentes máx.</span>
                    <span>🕒 {evento.duracion} aprox.</span>
                  </div>
                </div>

                {/* 4. BOTÓN */}
                <div className="evento-accion">
                  {/* Envolvemos el botón en un Link que apunta a /comprar/ID_DEL_EVENTO */}
                  <Link to={`/comprar/${evento.id}`}>
                   <button className="btn-comprar">Comprar entrada</button>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Eventos;