import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "../cudeca.css"; // <--- DESCOMENTA ESTA LÍNEA EN TU VS CODE (y borra la etiqueta <style> de abajo)

function Login() {
  const navigate = useNavigate();

  // Estado para guardar el email y la contraseña
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", formData);
    navigate("/");
  };

  return (
    <div className="pagina">
     
      {/* --- BARRA DE NAVEGACIÓN --- */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <a href="#">Mis entradas</a>
          <a href="#">Eventos</a>
          <a href="#">Perfil</a>
          <Link to="/LogIn" className="enlace-verde">
            Iniciar sesión
          </Link>
        </nav>
        {/* AÑADIDO: El logo a la derecha, igual que en la Home */}
        <div className="logo">
           <img src="/recursos/cudecaLogo.png" alt="Fundación Cudeca" height="60" />
        </div>
      </header>

      <main className="contenido">
        <div className="tarjeta-registro">
          {/* --- LADO IZQUIERDO (IMAGEN) --- */}
          <div className="lado-izquierdo">
            <div className="contenedor-imagen">
              {/* Nota: En la previsualización la imagen puede no cargar si no existe la ruta. 
                  En tu proyecto local funcionará bien. */}
              <img
                src="/recursos/cudecaSignupImg.jpg"
                className="imagen-tarjeta"
                alt="Personal médico cuidando"
                onError={(e) => {
                   e.target.style.display = 'none'; 
                   e.target.parentNode.style.backgroundColor = '#ccc';
                   e.target.parentNode.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Imagen aquí</div>';
                }}
              />
            </div>
          </div>

          {/* --- LADO DERECHO (FORMULARIO) --- */}
          <div className="lado-derecho">
            <h1 className="titulo-formulario">Iniciar sesión</h1>
            <p className="subtitulo-formulario">
              ¿No tiene cuenta aún?{" "}
              <Link to="/registro">Regístrese</Link>
            </p>

            <form className="formulario-registro" onSubmit={handleSubmit}>
              <div className="grupo-campo">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grupo-campo">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
                <a href="#" style={{ color: '#02b557', fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>
                  ¿Ha olvidado su contraseña?
                </a>
              </div>

              <button type="submit" className="boton-siguiente">
                Siguiente
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;