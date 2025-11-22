import { useState } from "react";
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
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí NO hay backend: solo simulamos que se inició sesión
    if (email.trim() && password.trim()) {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Por favor, completa correo y contraseña.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <>
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

              {/* Login / Logout button */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  className="nav-login-button"
                  onClick={handleOpenLogin}
                >
                  Iniciar sesión
                </button>
              ) : (
                <button
                  type="button"
                  className="nav-user-button"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                >
                  👤 {/* Icono de usuario */}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Modal de login */}
      {showLogin && !isLoggedIn && (
        <div className="login-backdrop" onClick={handleCloseLogin}>
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()} // que no cierre al hacer click dentro
          >
            <h2 className="login-title">Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <label className="login-label">
                Correo institucional
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carnet@uca.edu.sv"
                  className="login-input"
                  required
                />
              </label>

              <label className="login-label">
                Contraseña
                <div className="login-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="login-input"
                    required
                  />
                  <button
                    type="button"
                    className="login-toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </label>

              <button type="submit" className="login-submit">
                Entrar
              </button>

              <button
                type="button"
                className="login-cancel"
                onClick={handleCloseLogin}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
