interface SectorParqueo {
  codigo: string;
  nombre: string;
  detalle: string;
  estadoBadge: string;
  badgeClass: string;
}

const SECTORES: SectorParqueo[] = [
  {
    codigo: "ZONA A",
    nombre: "Subterráneo Acceso Rápido",
    detalle: "Control por patente y ticket digital para estadías por hora o jornada.",
    estadoBadge: "Disponible",
    badgeClass: "text-bg-success",
  },
  {
    codigo: "ZONA B",
    nombre: "Electromovilidad y Carga",
    detalle: "Plazas señalizadas con cargador para vehículos eléctricos e híbridos.",
    estadoBadge: "Carga Activa",
    badgeClass: "text-bg-primary",
  },
  {
    codigo: "ZONA C",
    nombre: "Abono Mensual Residentes",
    detalle: "Cupo asignado 24/7 con soporte directo para gestión de pases.",
    estadoBadge: "Cupos Limitados",
    badgeClass: "text-bg-warning text-dark",
  },
];

export default function ResumenEstacionamiento() {
  return (
    <section aria-label="Zonas de estacionamiento SmartPark" className="mb-4">
      <div className="row g-3">
        {SECTORES.map((sector) => (
          <div className="col-12 col-md-4" key={sector.codigo}>
            <article className="card sp-zone-card h-100 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small text-primary">{sector.codigo}</span>
                <span className={`badge ${sector.badgeClass}`}>{sector.estadoBadge}</span>
              </div>
              <h2 className="h6 fw-bold mb-1">{sector.nombre}</h2>
              <p className="small text-secondary mb-0">{sector.detalle}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}