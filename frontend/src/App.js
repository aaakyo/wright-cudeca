import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Login from "./paginas/LogIn.jsx"; 
import Perfil from "./paginas/Perfil.jsx";
import Eventos from "./paginas/Eventos.jsx";
import MisEntradas from "./paginas/MisEntradas.jsx";
import ComprarEntrada from "./paginas/ComprarEntrada.jsx"; // <--- 1. IMPORTAR

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/comprar/:id" element={<ComprarEntrada />} />
        <Route path="/misentradas" element={<MisEntradas />} />
      </Routes>
    </Router>
  );
}

export default App;