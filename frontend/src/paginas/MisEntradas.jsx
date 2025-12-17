import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/cudeca.css";
import "../estilos/MisEntradas.css";

function MisEntradas() {
  const [entradas, setEntradas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem('usuarioLogueado');
    if (userString) {
      const user = JSON.parse(userString);
      setUsuario(user);

      fetch(`http://localhost:8080/api/entradas/usuario/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setEntradas(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Función auxiliar para mostrar la fecha bonita
  const formatearFecha = (fechaString) => {
      if (!fechaString) return "Fecha por confirmar";
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="pagina">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
            <Link to="/">Inicio</Link>
            <Link to="/misentradas" className="enlace-verde" style={{textDecoration:'underline'}}>Mis entradas</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/perfil">Perfil</Link>
        </nav>
        <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60"/></div>
      </header>

      <main className="contenido-eventos" style={{minHeight: '80vh'}}> 
        <div className="contenedor-lista-eventos">
            
            <div className="cabecera-lista">
                <h1 style={{fontSize: '2.5rem', marginTop: '20px'}}>Mis Entradas</h1>
            </div>

            {!usuario ? (
                <div style={{textAlign: 'center', padding: '60px', background:'white', borderRadius:'16px', boxShadow:'0 4px 10px rgba(0,0,0,0.05)'}}>
                    <h2 style={{color:'#333'}}>Inicia sesión para ver tus entradas</h2>
                    <Link to="/login"><button className="btn-comprar">Iniciar Sesión</button></Link>
                </div>
            ) : (
                <div className="lista-tickets">
                    {entradas.length === 0 && !loading && (
                        <div style={{textAlign:'center', padding:'40px', background: 'white', borderRadius: '16px', color:'#777'}}>
                            <p>No tienes entradas activas.</p>
                            <Link to="/eventos" style={{color:'#02b557', fontWeight:'bold'}}>Ir a comprar entradas</Link>
                        </div>
                    )}

                    {entradas.map(entrada => (
                        <div key={entrada.id} className="ticket-card">
                            
                            <div className="ticket-icon-box">🎫</div>
                            
                            <div className="ticket-details">
                                <h3 className="ticket-evento-titulo">
                                    {/* Leemos directo de la BBDD */}
                                    {entrada.nombreEvento || "Evento sin nombre"}
                                </h3>
                                <div className="ticket-meta">
                                    <div style={{color: '#02b557', fontWeight: 'bold', marginBottom:'5px'}}>
                                        📅 {formatearFecha(entrada.fecha)} - ⏰ {entrada.hora || "Hora s/c"}
                                    </div>
                                    <div><strong>Titular:</strong> {usuario.nombre} {usuario.apellidos}</div>
                                    <div><strong>Email:</strong> {entrada.email}</div>
                                    <div style={{fontSize:'12px', marginTop:'5px', color:'#999'}}>ID Compra: {entrada.id}</div>
                                </div>
                            </div>

                            <div className={`ticket-status-badge ${entrada.pagada ? 'status-pagado' : 'status-pendiente'}`}>
                                {entrada.pagada ? 'Pagado' : 'Pendiente'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default MisEntradas;