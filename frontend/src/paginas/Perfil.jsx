import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../estilos/cudeca.css";
import "../estilos/perfil.css";

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem('usuarioLogueado');
    if (!userString) {
        navigate("/login");
        return;
    }
    const user = JSON.parse(userString);
    setUsuario(user);
    setFormData(user); 

    fetch(`http://localhost:8080/api/entradas/usuario/${user.id}`)
        .then(res => res.json())
        .then(data => {
            // Ordenamos para que salgan primero las más recientes
            setEntradas(data.reverse());
        })
        .catch(err => console.error(err));

  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const userActualizado = await response.json();
            const nuevoUser = { ...usuario, ...userActualizado };
            localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUser));
            setUsuario(nuevoUser);
            setEditando(false);
            alert("Perfil actualizado correctamente");
        } else {
            alert("Error al actualizar");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
  };

  const cerrarSesion = () => {
      localStorage.removeItem('usuarioLogueado');
      navigate('/');
      window.location.reload();
  };

  // Función para sacar día y mes de la fecha REAL de la BBDD
  const formatearFecha = (fechaString) => {
      if (!fechaString) return { dia: "??", mes: "..." };
      
      const fecha = new Date(fechaString);
      const dia = fecha.getDate();
      const mes = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
      
      return { dia, mes };
  };

  if (!usuario) return null;

  return (
    <div className="pagina">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
            <Link to="/">Inicio</Link>
            <Link to="/misentradas">Mis entradas</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/perfil" className="enlace-verde" style={{textDecoration:'underline'}}>Perfil</Link>
            <span onClick={cerrarSesion} style={{cursor:'pointer', marginLeft:'20px', color:'#666'}}>Cerrar sesión</span>
        </nav>
        <div className="logo"><img src="/recursos/cudecaLogo.png" alt="logo" height="60" /></div>
      </header>

      <div className="perfil-container">
        
        <div className="perfil-header">
            <h1 className="perfil-titulo">Mi perfil</h1>
            <div className="perfil-acciones">
                <button className="btn-editar" onClick={() => setEditando(!editando)}>
                    {editando ? "Cancelar edición" : "Editar perfil"}
                </button>
                
                {/* --- AQUÍ ESTÁ EL CAMBIO CLAVE --- */}
                {/* Enlazamos el botón al Dashboard de Admin */}
                <Link to="/adminperfil">
                    <button className="btn-admin">Ver opciones de admin</button>
                </Link>
                {/* ---------------------------------- */}
            </div>
        </div>

        <div className="perfil-card-grande">
            
            <div className="columna-datos">
                <div className="avatar-circulo">👤</div>
                <h2 className="nombre-completo">{usuario.nombre} {usuario.apellidos}</h2>

                {editando ? (
                    <>
                        <input type="text" name="email" value={formData.email} disabled className="dato-input-editable" style={{opacity:0.6}}/>
                        <input type="text" name="direccionPostal" value={formData.direccionPostal || ''} placeholder="Dirección" onChange={handleChange} className="dato-input-editable"/>
                        <input type="text" name="telefono" value={formData.telefono || ''} placeholder="Teléfono" onChange={handleChange} className="dato-input-editable"/>
                        <button className="btn-guardar" onClick={handleGuardar}>GUARDAR CAMBIOS</button>
                    </>
                ) : (
                    <>
                        <div className="dato-box">{usuario.email}</div>
                        <div className="dato-box">{usuario.direccionPostal || "Sin dirección añadida"}</div>
                        <div className="dato-box">{usuario.telefono || "Sin teléfono"}</div>
                    </>
                )}
            </div>

            <div className="columna-eventos">
                <h3 className="titulo-seccion">Mis eventos</h3>
                
                <div className="lista-eventos-perfil">
                    {entradas.length === 0 ? (
                        <p style={{color:'#999'}}>No tienes eventos próximos.</p>
                    ) : (
                        entradas.map((entrada, index) => {
                            const { dia, mes } = formatearFecha(entrada.fecha);

                            return (
                                <div key={index} className="fila-evento">
                                    <div className="fecha-evento">
                                        <span className="dia">{dia}</span>
                                        <span className="mes">{mes}</span>
                                    </div>
                                    <div className="info-evento">
                                        <div className="titulo-evento">
                                            {entrada.nombreEvento || "Evento sin nombre"}
                                        </div>
                                        <div className="hora-evento">{entrada.hora || "Hora por confirmar"}</div>
                                    </div>
                                    
                                    <span className={`badge ${entrada.pagada ? 'pendiente' : 'cancelado'}`}>
                                        {entrada.pagada ? 'Activo' : 'Pendiente'}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                <Link to="/eventos" className="link-descubre">Descubre más eventos</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;