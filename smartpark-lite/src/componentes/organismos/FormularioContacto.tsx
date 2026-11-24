import { useState, type SubmitEvent } from "react";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;

    if (!nombre.trim()) {
      alert("Debe ingresar su nombre");
      return;
    }
    if (!correo.trim()) {
      alert("Debe ingresar su correo");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      alert("Ingrese un correo válido");
      return;
    }
    if (!mensaje.trim()) {
      alert("Debe ingresar un mensaje");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch("http://localhost:8082/api/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreCompleto: nombre.trim(),
          correo: correo.trim(),
          mensaje: mensaje.trim(),
        }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      alert("Mensaje guardado correctamente");
      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el contacto:", error);
      alert("No se pudo enviar el mensaje. Intente nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "560px" }}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Formulario de contacto - SmartPark</h2>
        <form onSubmit={manejarEnvio} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Matías Campos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ej: matias@correo.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <input
              type="text"
              className="form-control"
              placeholder="Escribe tu mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}