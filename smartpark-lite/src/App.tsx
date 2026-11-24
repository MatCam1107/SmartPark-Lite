import { Routes, Route } from "react-router-dom";
import Contacto from "./paginas/Contacto";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Contacto />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
}

export default App;