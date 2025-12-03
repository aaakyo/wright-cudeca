import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "../cudecaRegistro.css";

function Registro() {
  const [paso, setPaso] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contraseña: "",
    contraseñaConfirmada: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPaso1 = (e) => {
    e.preventDefault();
    setPaso(2);
  };

  const handleSubmitPaso2 = (e) => {
    e.preventDefault();
    if (!formData.contraseña || formData.contraseña !== formData.contraseñaConfirmada) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setPaso(3);
  };

  const irAlInicio = () => {
    navigate("/");
  };

  return (
    <div className="pagina-registro">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <a href="#">Mis entradas</a>
          
          {/* --- CORRECCIÓN AQUÍ TAMBIÉN --- */}
          <Link to="/eventos">Eventos</Link>
          
          <a href="#">Perfil</a>
          <Link to="/login" className="enlace-verde">
            Iniciar sesión
          </Link>
        </nav>
        
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Fundación Cudeca" height="60" />
        </div>
      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="contenido">
        <div className="tarjeta-registro">
          <div className="lado-izquierdo">
            <div className="contenedor-imagen">
              <img
                src="/recursos/cudecaSignupImg.jpg"
                className="imagen-tarjeta"
                alt="Personas sonriendo"
              />
            </div>
          </div>

          <div className="lado-derecho">
            <div className="puntos">
              <span className={`punto ${paso === 1 ? "punto-activo" : ""}`} />
              <span className={`punto ${paso === 2 ? "punto-activo" : ""}`} />
              <span className={`punto ${paso === 3 ? "punto-activo" : ""}`} />
            </div>

            {paso === 1 && (
              <>
                <h1 className="titulo-formulario">Registrarse</h1>
                <p className="subtitulo-formulario">
                  ¿Ya tiene una cuenta? <Link to="/login">Inicie sesión</Link>
                </p>

                <form className="formulario-registro" onSubmit={handleSubmitPaso1}>
                  <div className="fila-formulario">
                    <div className="grupo-campo">
                      <label>Nombre</label>
                      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div className="grupo-campo">
                      <label>Apellidos</label>
                      <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="grupo-campo">
                    <label>Correo electrónico</label>
                    <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="grupo-campo">
                    <label>Teléfono (opcional)</label>
                    <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
                  </div>

                  <div className="checkbox-formulario">
                    <input type="checkbox" id="terminos" />
                    <label htmlFor="terminos">
                      He leído y acepto la <a href="#">política de términos y condiciones de CUDECA</a>
                    </label>
                  </div>

                  <button type="submit" className="boton-siguiente">Siguiente</button>
                </form>
              </>
            )}

            {paso === 2 && (
              <>
                <h1 className="titulo-formulario">¡Ya casi estás!</h1>
                <p className="subtitulo-formulario">Establezca y confirme su contraseña.</p>
                <form className="formulario-registro" onSubmit={handleSubmitPaso2}>
                  <div className="grupo-campo">
                    <label>Contraseña</label>
                    <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
                  </div>
                  <div className="grupo-campo">
                    <label>Repetir contraseña</label>
                    <input type="password" name="contraseñaConfirmada" placeholder="Contraseña" value={formData.contraseñaConfirmada} onChange={handleChange} />
                  </div>
                  <div className="fila-botones">
                    <button type="button" className="boton-siguiente boton-atras" onClick={() => setPaso(1)}>Atrás</button>
                    <button type="submit" className="boton-siguiente">Siguiente</button>
                  </div>
                </form>
              </>
            )}

            {paso === 3 && (
              <>
                <h1 className="titulo-formulario">¡Listo!</h1>
                <p className="subtitulo-formulario">Se ha registrado con éxito, ya puede volver a la página principal.</p>
                <button type="button" className="boton-siguiente" onClick={irAlInicio}>Ir al inicio</button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Registro;