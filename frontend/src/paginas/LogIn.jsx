import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../estilos/cudecaRegistro.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // --- CONEXIÓN CON BACKEND ---
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // 1. Convertimos la respuesta de Java a un objeto JS
            const usuario = await response.json();
            
            // Guardamos al usuario en la "mochila" del navegador
            // Esto nos servirá para saber quién está logueado en las otras páginas
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

            alert("¡Bienvenido de nuevo, " + usuario.nombre + "!");
            navigate("/"); // Vamos al inicio
        } else {
            alert("Email o contraseña incorrectos. Inténtalo de nuevo.");
        }

    } catch (error) {
        console.error("Error al conectar:", error);
        alert("Error de conexión con el servidor.");
    }
  }

  return (
    <div className="pagina-registro">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/login" className="enlace-activo">
            Iniciar sesión
          </Link>
        </nav>
        <div className="logo">
          <img
            src="/recursos/cudecaLogo.png"
            alt="Fundación Cudeca"
            height="60"
          />
        </div>
      </header>

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
              <span className="punto punto-activo"></span>
              <span className="punto"></span>
            </div>

            <h1 className="titulo-formulario">Iniciar sesión</h1>
            <p className="subtitulo-formulario">
              ¿No tiene cuenta aún? <Link to="/registro">Regístrese</Link>
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
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                <a
                  href="#"
                  style={{
                    color: "#02b557",
                    fontSize: "14px",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                >
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