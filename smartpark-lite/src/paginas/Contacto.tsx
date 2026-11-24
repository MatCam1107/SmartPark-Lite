// src/paginas/Contacto.tsx
import ResumenEstacionamiento from "../componentes/moleculas/ResumenEstacionamiento";
import FormularioContacto from "../componentes/organismos/FormularioContacto";

export default function Contacto() {
  return (
    <main className="container py-4 py-md-5" style={{ maxWidth: "960px" }}>
      <section className="sp-hero p-4 p-md-5 mb-4 shadow-sm">
        <span className="badge text-bg-warning text-dark mb-2">
          Sistema de Gestión Vehicular SmartPark
        </span>
        <h1 className="h3 h2-md fw-bold mb-2">
          Estacionamientos Inteligentes y Atención al Conductor
        </h1>
        <p className="mb-0 text-light">
          Revisa las zonas operativas del recinto y envíanos tu consulta o solicitud de cupo en segundos.
        </p>
      </section>

      <ResumenEstacionamiento />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <FormularioContacto />
      </div>
    </main>
  );
}