// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/organismos/Navbar";
import Contacto from "./paginas/Contacto";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Contacto />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>

      <footer className="sp-footer py-4 mt-4">
        <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small">
          <span>
            <strong>SmartPark</strong> · Gestión de Estacionamientos y Acceso Vehicular
          </span>
          <span>Fullstack II · React + TypeScript + Bootstrap + Spring Boot</span>
        </div>
      </footer>
    </div>
  );
}

export default App;