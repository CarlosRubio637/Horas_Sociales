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
            {/* OPCIÓN ESPECIAL SOLO PARA ADMIN - va a la misma página CSS pero con permisos */}
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
                  {/* ✅ CORREGIDO: usa handleLogout en lugar de setIsLoggedIn(false) */}
                  <button className="nav-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
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
  );
}

export default NavBar;