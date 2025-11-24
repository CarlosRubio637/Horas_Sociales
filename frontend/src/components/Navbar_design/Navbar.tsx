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

function NavBar({ title = "Servicio Social UCA", logoUrl = "/buho.png" }: NavBarProps) {
  
  // --- ESTADOS ---
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setIsLoggedIn(true);
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token'); 
    window.location.reload(); 
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            correo: correo,       
            contraseña: password  
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        setUsuario(data.usuario);
        setIsLoggedIn(true);
        setShowLogin(false); // Cierra el modal
        
        setCorreo('');
        setPassword('');

        // Emitir evento para avisar a otros componentes
        window.dispatchEvent(new Event("auth-change"));

      } else {
        setErrorMsg(data.msg || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Error de conexión');
    }
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
            
            {isLoggedIn && (usuario?.rol === 'administrador' || usuario?.rol === 'admin') && (
              <Link to={PATHS.CSS_info} className="nav-item admin-option">
                👑 Admin CSS
              </Link>
            )}
            
            {isLoggedIn && (usuario?.rol === 'usuario' || usuario?.rol === 'estudiante') && (
              <Link to={PATHS.MIS_SOLICITUDES} className="nav-item">
                Mis Solicitudes
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
                    {(usuario?.rol === 'administrador' || usuario?.rol === 'admin') && ' 👑'}
                  </span>
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
              
              {errorMsg && (
                <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  {errorMsg}
                </div>
              )}

              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="login-input"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;