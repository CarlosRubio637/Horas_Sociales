import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./UserPanel.css";

interface Usuario {
  nombre: string;
  rol: string;
  correo: string;
}

const UserPanel = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/"); // Si no hay sesión, expulsar al home
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  const isAdmin = user.rol === 'admin' || user.rol === 'administrador';

  // Determinar qué link está activo para resaltarlo
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="panel-container">
      {/* Botón móvil */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰ Menú
      </button>

      {/* Sidebar */}
      <aside className={`panel-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-user-name">{user.nombre}</div>
          <div className="sidebar-user-role">{isAdmin ? 'Administrador' : 'Estudiante'}</div>
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="/panel" 
            className={`sidebar-link ${location.pathname === '/panel' ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
             Inicio
          </Link>

          {/* Opciones de estudiante */}
          {!isAdmin && (
            <>
              <Link 
                to="/panel/mis-solicitudes" 
                className={`sidebar-link ${isActive('mis-solicitudes') ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                 Mis Solicitudes
              </Link>
              <Link 
                to="/panel/inscribir-proyecto" 
                className={`sidebar-link ${isActive('inscribir-proyecto') ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                 Inscribir Proyecto
              </Link>
            </>
          )}

          {/* Opciones de administrador */}
          {isAdmin && (
            <>
              <Link 
                to="/panel/gestion-proyectos" 
                className={`sidebar-link ${isActive('gestion-proyectos') ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                 Gestionar Proyectos
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="panel-content">
        {location.pathname === '/panel' && (
          <div className="panel-welcome">
            <h1>Bienvenido a tu Panel, {user.nombre.split(' ')[0]}</h1>
            <p>Desde aquí puedes gestionar tus actividades de servicio social.</p>
            <p>Selecciona una opción del menú lateral para comenzar.</p>
          </div>
        )}
        
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;