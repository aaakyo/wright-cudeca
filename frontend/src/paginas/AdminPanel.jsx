import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../estilos/cudeca.css";
import "../estilos/ComprarEntrada.css"; 

function AdminPanel() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    lugar: '',
    fechaInicio: '',
    horaInicio: '',
    precio: '',
    descripcion: '',
    imagen: '' 
  });

  useEffect(() => {
    const userString = localStorage.getItem('usuarioLogueado');
    if (userString) {
        setUsuario(JSON.parse(userString));
    } else {
        alert("Debes iniciar sesión para ver esto");
        navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
        alert("No estás logueado.");
        return;
    }

    // Objeto a enviar
    const eventoEnviar = {
        nombre: nuevoEvento.nombre,
        lugar: nuevoEvento.lugar,
        fechaInicio: nuevoEvento.fechaInicio, 
        horaInicio: nuevoEvento.horaInicio + ":00", // Formato HH:mm:ss
        precio: parseFloat(nuevoEvento.precio),
        descripcion: nuevoEvento.descripcion,
        imagen: nuevoEvento.imagen || 'placeholder.jpg'
    };

    try {
        // IMPORTANTE: Enviamos el ID del usuario en la URL
        const url = `http://localhost:8080/api/eventos?usuarioId=${usuario.id}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventoEnviar)
        });

        if (response.ok) {
            alert("✅ ¡Evento creado con éxito!");
            navigate('/eventos'); 
        } else {
            alert("❌ Error al crear evento. Revisa la consola.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="pagina">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/perfil">Volver al Perfil</Link>
        </nav>
        <div className="logo"><img src="/recursos/cudecaLogo.png" alt="Cudeca" height="60" /></div>
      </header>

      <main className="compra-main">
        <div className="compra-card-moderna" style={{flexDirection:'column'}}>
            
            <h2 className="titulo-compra" style={{textAlign:'center', color:'#333'}}>Panel de Administración</h2>
            <p style={{textAlign:'center', color:'#666', marginBottom:'30px'}}>
               Publicando como: <strong>{usuario ? usuario.nombre : '...'}</strong>
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
              
              <div className="fila-doble">
                  <div className="campo-burbuja">
                    <label>Nombre del Evento:</label>
                    <input type="text" name="nombre" value={nuevoEvento.nombre} onChange={handleChange} required placeholder="Ej: Cena de Gala" />
                  </div>
                  <div className="campo-burbuja">
                    <label>Lugar:</label>
                    <input type="text" name="lugar" value={nuevoEvento.lugar} onChange={handleChange} required placeholder="Ej: Hotel Meliá" />
                  </div>
              </div>

              <div className="fila-doble">
                  <div className="campo-burbuja">
                    <label>Fecha:</label>
                    <input type="date" name="fechaInicio" value={nuevoEvento.fechaInicio} onChange={handleChange} required />
                  </div>
                  <div className="campo-burbuja">
                    <label>Hora:</label>
                    <input type="time" name="horaInicio" value={nuevoEvento.horaInicio} onChange={handleChange} required />
                  </div>
              </div>

              <div className="fila-doble">
                  <div className="campo-burbuja">
                    <label>Precio (€):</label>
                    <input type="number" step="0.01" name="precio" value={nuevoEvento.precio} onChange={handleChange} required placeholder="0" />
                  </div>
                  <div className="campo-burbuja">
                    <label>Nombre Imagen:</label>
                    <input type="text" name="imagen" value={nuevoEvento.imagen} onChange={handleChange} placeholder="ej: evento1.jpg" />
                  </div>
              </div>

              <div className="campo-burbuja">
                <label>Descripción:</label>
                <textarea 
                    name="descripcion" 
                    value={nuevoEvento.descripcion} 
                    onChange={handleChange} 
                    rows="4"
                    style={{backgroundColor:'#f0f2f5', border:'none', borderRadius:'12px', padding:'15px', fontFamily:'inherit', resize:'none'}}
                />
              </div>

              <button className="btn-confirmar-compra" style={{backgroundColor:'#333'}}>
                PUBLICAR EVENTO
              </button>

            </form>
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;