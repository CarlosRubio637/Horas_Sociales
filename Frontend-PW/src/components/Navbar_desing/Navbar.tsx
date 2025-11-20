import { Link } from "react-router-dom";  
import "./Navbar.css";
import { PATHS } from "@/app/routes/paths";

interface NavBarProps {
  title?: string;
  logoUrl?: string;
}

function NavBar({
  title = "Servicio Social UCA",
  logoUrl = "/buho.png",
}: NavBarProps) {
  return (
    <header className="header">
      <nav className="main-navbar">
        <div className="navbar-list">
          <div className="navbar-brand">
            <img className="navbar-logo" src={logoUrl} alt={`Logo ${title}`} />
            <h3 className="navbar-title">{title}</h3>
          </div>
          <div className="navbar-item-right">
            <Link to={PATHS.HOME} className="nav-item">Home</Link>
            <Link to={PATHS.CSS_info} className="nav-item">CSS</Link>
            <Link to={PATHS.PROGRAMAS} className="nav-item">Programas de formación</Link>
            <div className="search-container">
              <input
                type="text"
                className="header-search"
                placeholder="Buscar..."
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
