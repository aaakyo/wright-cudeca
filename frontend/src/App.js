import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Login from "./paginas/LogIn.jsx"; 
import Perfil from "./paginas/Perfil.jsx";
import Eventos from "./paginas/Eventos.jsx";
import MisEntradas from "./paginas/MisEntradas.jsx";
import ComprarEntrada from "./paginas/ComprarEntrada.jsx"; 
import ResultadoCompra from "./paginas/ResultadoCompra.jsx";
import PerfilAdmin from "./paginas/PerfilAdmin.jsx";
import AdminPanel from "./paginas/AdminPanel.jsx"; 

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
        <Route path="/resultado" element={<ResultadoCompra />} />
        <Route path="/adminperfil" element={<PerfilAdmin />} /> 
        <Route path="/admin" element={<AdminPanel />} />       

      </Routes>
    </Router>
  );
}

export default App;