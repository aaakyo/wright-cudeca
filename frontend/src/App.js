import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Login from "./paginas/LogIn.jsx"; 
import Perfil from "./paginas/Perfil.jsx"; // <--- ESTO FALTABA (Importar Perfil)

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

        {/* Ruta de Perfil (AÑADIDA) */}
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;