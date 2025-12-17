import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "../estilos/cudeca.css";
// Asegúrate de que importamos el CSS específico que vamos a crear ahora
import "../estilos/ComprarEntrada.css"; 

function ComprarEntrada() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', email: '', telefono: '', direccion: '', dni: '', donacion: ''
  });

  useEffect(() => {
    // 1. Cargar Evento
    fetch(`http://localhost:8080/api/eventos/${id}`)
      .then(res => {
         if(!res.ok) throw new Error("Error al cargar evento");
         return res.json();
      })
      .then(data => setEvento(data))
      .catch(err => console.error(err));

    // 2. Cargar Usuario
    const userString = localStorage.getItem('usuarioLogueado');
    if (userString) {
        const user = JSON.parse(userString);
        setUsuarioLogueado(user);
        setFormData(prev => ({
            ...prev,
            nombre: user.nombre || '',
            apellidos: user.apellidos || '',
            email: user.email || '',
            telefono: user.telefono || '',
            dni: user.dni || '',
            direccion: user.direccionPostal || ''
        }));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const realizarCompra = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem('usuarioLogueado');
    const usuarioAlInstante = userString ? JSON.parse(userString) : null;
    
    if (!formData.nombre || !formData.email) {
        alert("Por favor, rellena los campos obligatorios.");
        return;
    }

    const nuevaEntrada = {
        usuarioId: usuarioAlInstante ? usuarioAlInstante.id : null,
        eventoId: parseInt(id),
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        donacionExtra: parseInt(formData.donacion) || 0,
        pagada: true,
        cancelada: false
    };

    try {
        const response = await fetch('http://localhost:8080/api/entradas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaEntrada)
        });

        if (response.ok) {
            navigate('/resultado', {
                state: {
                    estado: 'exito',
                    datos: {
                        usuario: formData.nombre,
                        evento: evento.nombre,
                        fecha: evento.fechaInicio,
                        total: (evento.precio || 0) + (Number(formData.donacion) || 0)
                    }
                }
            });
        } else {
            alert("Error al procesar la compra.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión.");
    }
  };

  if (!evento) return <div className="pagina">Cargando...</div>;

  return (
    <div className="pagina">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
        <div className="logo"><img src="/recursos/cudecaLogo.png" alt="Cudeca" height="60" /></div>
      </header>

      <main className="compra-main">
        <div className="compra-card-moderna">
          
          {/* COLUMNA IZQUIERDA: POSTER */}
          <div className="col-poster">
             <img 
               src={evento.imagen ? `/recursos/${evento.imagen}` : "https://via.placeholder.com/300x450"} 
               alt={evento.nombre}
               className="poster-imagen"
             />
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="col-formulario">
            <h2 className="titulo-compra">{evento.nombre}</h2>
            <p className="precio-compra">{evento.precio ? `${evento.precio}€` : 'Gratuito'}</p>
            
            <div className="aviso-usuario">
                {usuarioLogueado 
                    ? `👤 Comprando como: ${usuarioLogueado.nombre}`
                    : `ℹ️ Comprando como INVITADO`
                }
            </div>

            <form className="form-grid">
              {/* FILA 1: Nombre y Apellidos */}
              <div className="fila-doble">
                  <div className="campo-burbuja">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                  </div>
                  <div className="campo-burbuja">
                    <label>Apellidos:</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                  </div>
              </div>

              {/* FILA 2: Email y Teléfono */}
              <div className="fila-doble">
                  <div className="campo-burbuja">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="campo-burbuja">
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                  </div>
              </div>

              {/* FILA 3: Dirección */}
              <div className="campo-burbuja">
                <label>Dirección:</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
              </div>

              {/* FILA 4: Donación */}
              <div className="campo-burbuja">
                 <label>¿Donación extra? (Opcional)</label>
                 <input type="number" name="donacion" placeholder="0€" value={formData.donacion} onChange={handleChange} />
              </div>

              <button className="btn-confirmar-compra" onClick={realizarCompra}>
                CONFIRMAR COMPRA
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ComprarEntrada;