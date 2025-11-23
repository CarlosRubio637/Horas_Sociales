import { useState } from "react";
import { Link } from "react-router-dom";  
import { useState, useEffect } from "react";
import "./Navbar.css";
import { PATHS } from "@/app/routes/paths";

interface NavBarProps {
  title?: string;
  logoUrl?: string;
}

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
}

function NavBar({
  title = "Servicio Social UCA",
  logoUrl = "/buho.png",
}: NavBarProps) {
  
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() =>{
    const userData = localStorage.getItem('usuario');
    if(userData) {
      setIsLoggedIn(true);
      setUsuario(JSON.parse(userData));
    }
  }, []);

  //Simulacion del login - Borrar despues del testeo
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userSimulado : Usuario = {
      id: "1",
      nombre: "Administrador UCA",
      correo: "admin@uca.edu.sv",
      rol: "administrador" //AL testear, cambiar el rol a usuario para probar
    };

    setUsuario(userSimulado);
    setIsLoggedIn(true);
    localStorage.setItem('usuario', JSON.stringify(userSimulado));
    setShowLogin(false);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario(null);
    localStorage.removeItem('usuario');
  };


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
    <header className="header">
      <nav className="main-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <img className="navbar-logo" src={logoUrl} alt={`Logo ${title}`} />
            <h3 className="navbar-title">{title}</h3>
          </div>
          <div className="navbar-nav">
            <Link to={PATHS.HOME} className="nav-item">Home</Link>
            <Link to={PATHS.CSS_info} className="nav-item">CSS</Link>
            <Link to={PATHS.PROGRAMAS} className="nav-item">Programas de formación</Link> 
            {isLoggedIn && usuario?.rol === 'administrador' && (
              <Link to={PATHS.CSS_info} className="nav-item admin-option">
                👑 Admin CSS
              </Link>
            )}
          </div>
          <div className="navbar-actions">
            <div className="search-container">
              <input
                type="text"
                className="header-search"
                placeholder="Buscar..."
              />
            </div>
            <div className="auth-section">
              {!isLoggedIn ? (
                <button 
                  className="nav-item login-btn"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              ) : (
                <div className="user-menu">
                  <span className="user-greeting">
                    Hola, {usuario?.nombre}
                    {usuario?.rol === 'administrador' && ' 👑'}
                  </span>
                  <button className="nav-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
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
      </nav>
      {showLogin && (
        <div className="login-overlay">
          <div className="login-modal">
            <div className="login-content">
              <h3 className="login-title">Iniciar Sesión</h3>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="login-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-login">
                    Ingresar
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setShowLogin(false)}
                  >
                    Cancelar
                  </button>
                </div>
                
                {/* Info de prueba */}
                <div className="login-info">
                  <p>Para probar: usa cualquier correo y contraseña</p>
                  <p>Por defecto entrará como <strong>administrador</strong></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
      )}
    </>
  );
}

export default NavBar;