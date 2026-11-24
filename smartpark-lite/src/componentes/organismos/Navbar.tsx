import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark sp-navbar py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <span className="badge text-bg-warning text-dark">P</span>
            <span>SmartPark</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuSmartPark"
            aria-controls="menuSmartPark"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="menuSmartPark">
            <ul className="navbar-nav ms-auto gap-lg-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">
                  Contacto y Reservas
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}