import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Body from "@/components/Body_design/Body";
import "./MyApplications.css";

// Interfaz basada en lo que devuelve tu backend (getMisAplicaciones)
interface Application {
  _id: string;
  proyecto: {
    _id: string;
    titulo: string;
    descripcion: string;
  };
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fechaSumision: string; // El backend devuelve fecha ISO
}

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("usuario");

    // 1. Verificar autenticación básica
    if (!token || !user) {
      navigate("/"); // Si no hay sesión, al home
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/aplicaciones/mis-aplicaciones", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          const errData = await response.json();
          setError(errData.msg || "Error al cargar tus aplicaciones.");
        }
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  if (loading) {
    return (
      <Body>
        <div className="my-apps-container">
          <div className="loading-message">Cargando tus solicitudes...</div>
        </div>
      </Body>
    );
  }

  if (error) {
    return (
      <Body>
        <div className="my-apps-container">
          <h1 className="my-apps-title">Mis Solicitudes</h1>
          <div className="error-message-box">
            <p>{error}</p>
          </div>
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <div className="my-apps-container">
        <h1 className="my-apps-title">Mis Solicitudes de Horas Sociales</h1>

        {applications.length === 0 ? (
          <div className="no-data-message">
            <p>Aún no has enviado ninguna solicitud.</p>
            <Link to="/css" className="link-to-css">
              Ver Proyectos Disponibles
            </Link>
          </div>
        ) : (
          <div className="apps-table-wrapper">
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Descripción</th>
                  <th>Fecha de Solicitud</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td className="project-title-cell">
                      {app.proyecto?.titulo || "Proyecto no disponible"}
                    </td>
                    <td className="project-desc-cell">
                      {app.proyecto?.descripcion || "Sin descripción"}
                    </td>
                    <td className="project-date-cell">
                      {new Date(app.fechaSumision).toLocaleDateString("es-ES", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <span className={`status-badge ${app.estado.toLowerCase()}`}>
                        {app.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Body>
  );
};

export default MyApplications;