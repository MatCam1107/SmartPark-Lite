import { useState, type SubmitEvent } from "react";

interface ErroresFormulario {
  nombre?: string;
  correo?: string;
  mensaje?: string;
}

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState<"idle" | "ok" | "error">("idle");
  const [detalleEnvio, setDetalleEnvio] = useState("");

  function validarCampos(
    valorNombre: string,
    valorCorreo: string,
    valorMensaje: string,
  ): ErroresFormulario {
    const nuevosErrores: ErroresFormulario = {};
    const nombreLimpio = valorNombre.trim();
    const correoLimpio = valorCorreo.trim();
    const mensajeLimpio = valorMensaje.trim();

    if (!nombreLimpio) {
      nuevosErrores.nombre = "Ingresa tu nombre y apellido (ej: Matías Campos).";
    } else if (nombreLimpio.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!correoLimpio) {
      nuevosErrores.correo = "Ingresa un correo electrónico para responderte.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      nuevosErrores.correo = "Formato no válido. Usa un correo como usuario@dominio.cl.";
    }

    if (!mensajeLimpio) {
      nuevosErrores.mensaje = "Describe tu consulta, sector de estacionamiento o patente.";
    } else if (mensajeLimpio.length < 6) {
      nuevosErrores.mensaje = "Escribe un mensaje un poco más descriptivo (mínimo 6 caracteres).";
    }

    return nuevosErrores;
  }

  async function manejarEnvio(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;

    setEstadoEnvio("idle");
    setDetalleEnvio("");

    const validacion = validarCampos(nombre, correo, mensaje);
    setErrores(validacion);

    if (Object.keys(validacion).length > 0) {
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

      setEstadoEnvio("ok");
      setDetalleEnvio("Tu solicitud quedó registrada en SmartPark y enviada al sistema.");
      setNombre("");
      setCorreo("");
      setMensaje("");
      setErrores({});
    } catch (error) {
      console.error("Error al enviar el contacto:", error);
      setEstadoEnvio("error");
      setDetalleEnvio(
        "No fue posible guardar el registro. Verifica que el backend en http://localhost:8082 esté activo.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section aria-labelledby="titulo-contacto" className="sp-form-card overflow-hidden">
      <div className="sp-form-header">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <span className="badge text-bg-primary">Atención y Control Vehicular</span>
          <span className="small text-light">API · /api/contactos</span>
        </div>
        <h2 id="titulo-contacto" className="h4 fw-bold mb-1">
          Formulario de contacto · SmartPark
        </h2>
        <p className="small text-light mb-0">
          Solicita información de cupos, abonos mensuales, carga eléctrica o asistencia en acceso.
        </p>
      </div>

      <div className="card-body p-4 p-md-5">
        {estadoEnvio === "ok" && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Registro enviado!</strong> {detalleEnvio}
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar alerta"
              onClick={() => setEstadoEnvio("idle")}
            />
          </div>
        )}

        {estadoEnvio === "error" && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error de envío:</strong> {detalleEnvio}
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar alerta"
              onClick={() => setEstadoEnvio("idle")}
            />
          </div>
        )}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="mb-3">
            <label htmlFor="campo-nombre" className="form-label fw-semibold">
              Nombre completo
            </label>
            <input
              id="campo-nombre"
              name="nombreCompleto"
              type="text"
              autoComplete="name"
              className={`form-control form-control-lg ${errores.nombre ? "is-invalid" : ""}`}
              placeholder="Ej: Matías Campos"
              value={nombre}
              onChange={(e) => {
                const val = e.target.value;
                setNombre(val);
                if (errores.nombre) {
                  setErrores((prev) => ({ ...prev, nombre: undefined }));
                }
              }}
            />
            <div className="form-text">
              Sugerencia: ingresa nombre y apellido tal como figurarán en tu pase o consulta.
            </div>
            {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="campo-correo" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              id="campo-correo"
              name="correo"
              type="email"
              autoComplete="email"
              className={`form-control form-control-lg ${errores.correo ? "is-invalid" : ""}`}
              placeholder="Ej: matias@correo.cl"
              value={correo}
              onChange={(e) => {
                const val = e.target.value;
                setCorreo(val);
                if (errores.correo) {
                  setErrores((prev) => ({ ...prev, correo: undefined }));
                }
              }}
            />
            <div className="form-text">
              Sugerencia: usa un correo activo para recibir confirmación de tu consulta.
            </div>
            {errores.correo && <div className="invalid-feedback d-block">{errores.correo}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="campo-mensaje" className="form-label fw-semibold">
              Mensaje / Consulta de estacionamiento
            </label>
            <input
              id="campo-mensaje"
              name="mensaje"
              type="text"
              list="sugerencias-smartpark"
              className={`form-control form-control-lg ${errores.mensaje ? "is-invalid" : ""}`}
              placeholder="Ej: Consulta abono mensual Zona A · Patente ABCD-12"
              value={mensaje}
              onChange={(e) => {
                const val = e.target.value;
                setMensaje(val);
                if (errores.mensaje) {
                  setErrores((prev) => ({ ...prev, mensaje: undefined }));
                }
              }}
            />
            <datalist id="sugerencias-smartpark">
              <option value="Consulta disponibilidad de cupos en Subterráneo Zona A" />
              <option value="Solicitud de abono mensual para vehículo particular" />
              <option value="Consulta por punto de carga eléctrica en Zona B" />
              <option value="Soporte de ingreso o lectura de patente" />
            </datalist>
            <div className="form-text">
              Sugerencia: haz doble clic o escribe para ver motivos frecuentes de estacionamiento.
            </div>
            {errores.mensaje && <div className="invalid-feedback d-block">{errores.mensaje}</div>}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg fw-semibold"
              disabled={enviando}
            >
              {enviando ? "Enviando a SmartPark..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}