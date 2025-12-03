import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./paginas/registro.jsx";
import Home from "./paginas/Home.jsx"; // Importamos la nueva página

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Inicio) */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta de registro */}
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;