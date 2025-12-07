import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../estilos/cudeca.css";
import "../estilos/MisEntradas.css";

function MisEntradas() {
  const [search, setSearch] = useState("");
  const [qrVisible, setQrVisible] = useState(false);
  const [qrImg, setQrImg] = useState("");

  const entradas = [
    {
      id: 1,
      titulo: "Cocktail Benéfico Cotton Club en Restaurante El Higuerón",
      fecha: "21 NOVIEMBRE",
      hora: "16:00",
      estado: "Pendiente",
      imagen: "/recursos/img_misentradas.png",
      qr: "/recursos/qr.png"
    },
    {
      id: 2,
      titulo: "Nombre Completo del Evento y Ubicación",
      fecha: "14 SEPTIEMBRE",
      hora: "19:00",
      estado: "Acabado",
      imagen: null,
      qr: "/recursos/qr.png"
    },
  ];

  const filtradas = entradas.filter((e) =>
    e.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const abrirQR = (img) => {
    setQrImg(img);
    setQrVisible(true);
  };

  const cerrarQR = () => {
    setQrVisible(false);
  };

  return (
    <div className="pagina">
      {/* NAVBAR */}
      <nav className="barra-navegacion">
        <div className="enlaces-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/misentradas" className="enlace-verde">Mis entradas</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/logout">Cerrar sesión</Link>
        </div>

        <div className="logo">
          <img
            src="/recursos/cudecaLogo.png"
            alt="Logo Cudeca"
            style={{ height: "50px" }}
          />
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="mis-entradas-top">
        <h1 className="titulo-pagina">Mis entradas</h1>

        <div className="mis-entradas-search-container">
          <input
            type="text"
            placeholder="Buscar entrada…"
            className="mis-entradas-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="mis-entradas-search-icon">🔍</span>
        </div>
      </div>

      <div className="mis-entradas-grid">
        {filtradas.map((entrada) => (
          <div key={entrada.id} className="entrada-card">

            <div className="entrada-img-wrapper">
              {entrada.imagen ? (
                <img src={entrada.imagen} alt={entrada.titulo} className="entrada-img" />
              ) : (
                <div className="entrada-img-placeholder"></div>
              )}
            </div>

            <h3 className="entrada-titulo">{entrada.titulo}</h3>
            <div className="entrada-fecha">{entrada.fecha}</div>
            <div className="entrada-hora">{entrada.hora}</div>

            <div className={`entrada-estado ${
              entrada.estado === "Pendiente" ? "estado-pendiente" : "estado-acabado"
            }`}>
              {entrada.estado}
            </div>

            <a
              href="#"
              className="entrada-verqr"
              onClick={(e) => {
                e.preventDefault();
                abrirQR(entrada.qr);
              }}
            >
              Ver QR
            </a>
          </div>
        ))}
      </div>

      {/* ===== MODAL QR ===== */}
      {qrVisible && (
        <div className="qr-overlay" onClick={cerrarQR}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <img src={qrImg} alt="QR" className="qr-img" />
          </div>
        </div>
      )}

    </div>
  );
}

export default MisEntradas;



