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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Iniciando sesión con:", formData);
    navigate("/");
  }

  return (
    <div className="pagina-registro">
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/LogIn" className="enlace-activo">
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
