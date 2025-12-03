import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx";
import Eventos from "./paginas/Eventos.jsx"; // Mantenemos TU importación
import Login from "./paginas/LogIn.jsx";     // Aceptamos SU importación

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Ruta de Login (Lo nuevo de tu compañero) */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta de Eventos (Lo nuevo tuyo) */}
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </Router>
  );
}

export default App;