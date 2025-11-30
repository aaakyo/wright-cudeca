// src/paginas/registro.jsx
import "../cudeca.css";

function Registro() {
  return (
    <div className="pagina">
      {/* BARRA DE NAVEGACIÓN */}
      <header className="barra-navegacion">
        <nav className="enlaces-navegacion">
          <a href="#">Inicio</a>
          <a href="#">Mis entradas</a>
          <a href="#">Eventos</a>
          <a href="#">Perfil</a>
          <a href="#" className="enlace-activo">
            Iniciar sesión
          </a>
        </nav>
      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="contenido">
        <div className="tarjeta-registro">
          {/* LADO IZQUIERDO: IMAGEN */}
          <div className="lado-izquierdo">
            <div className="contenedor-imagen">
              <img
                src="/recursos/cudecaSignupImg.jpg"
                alt="Personas sonriendo"
                className="imagen-tarjeta"
              />
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="lado-derecho">
            <div className="puntos">
              <span className="punto punto-activo"></span>
              <span className="punto"></span>
            </div>

            <h1 className="titulo-formulario">Registrarse</h1>
            <p className="subtitulo-formulario">
              ¿Ya tiene una cuenta? <a href="#">Inicie sesión</a>
            </p>

            <form className="formulario-registro">
              <div className="fila-formulario">
                <div className="grupo-campo">
                  <label>Nombre</label>
                  <input type="text" placeholder="Nombre" />
                </div>
                <div className="grupo-campo">
                  <label>Apellidos</label>
                  <input type="text" placeholder="Apellidos" />
                </div>
              </div>

              <div className="grupo-campo">
                <label>Correo electrónico</label>
                <input type="email" placeholder="Correo electrónico" />
              </div>

              <div className="grupo-campo">
                <label>Teléfono (opcional)</label>
                <input type="tel" placeholder="Teléfono (opcional)" />
              </div>

              <div className="checkbox-formulario">
                <input type="checkbox" id="terminos" />
                <label htmlFor="terminos">
                  He leído y acepto la{" "}
                  <a href="#">
                    política de términos y condiciones de CUDECA
                  </a>
                </label>
              </div>

              <button type="submit" className="boton-enviar">
                Siguiente
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Registro;
