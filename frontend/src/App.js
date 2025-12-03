import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Login from "./paginas/LogIn.jsx"; 
import Perfil from "./paginas/Perfil.jsx"; 
import Eventos from "./paginas/Eventos.jsx"; // <--- RECUPERADO: Importación de Eventos

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Inicio) */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta de registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} /> 

        {/* Ruta de Perfil (La de Arturo) */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Ruta de Eventos (RECUPERADA) */}
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </Router>
  );
}

export default App;