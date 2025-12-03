import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Login from "./paginas/LogIn.jsx"; 
import Perfil from "./paginas/Perfil.jsx"; // <--- 1. IMPORTACIÓN NUEVA

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

        {/* Ruta de Perfil (NUEVA) */}
        <Route path="/perfil" element={<Perfil />} /> {/* <--- 2. RUTA NUEVA */}
      </Routes>
    </Router>
  );
}

export default App;