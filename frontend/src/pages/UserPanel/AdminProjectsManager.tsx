import { useState, useEffect } from "react";
import "./AdminProjectsManager.css";

// Interfaces
interface Institution {
  _id: string;
  nombre: string;
}

interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  institucion: Institution;
  activo: boolean;
}

interface Application {
  _id: string;
  estudiante: {
    _id: string;
    nombre: string;
    correo: string;
    carnet?: string;
  };
  motivacion: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  createdAt: string;
}

const AdminProjectsManager = () => {
  // --- Estados de Datos ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // --- Estados de Formulario ---
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formInstitutionId, setFormInstitutionId] = useState("");

  // --- Estados de Modal de Inscritos ---
  const [showModal, setShowModal] = useState(false);
  const [currentApps, setCurrentApps] = useState<Application[]>([]);
  const [currentProjectTitle, setCurrentProjectTitle] = useState("");
  const [loadingApps, setLoadingApps] = useState(false);

  // --- Inicialización ---
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchProjects();
      fetchInstitutions(storedToken);
    }
  }, []);

  // --- Funciones API ---
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/proyectos");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error cargando proyectos:", error);
    }
  };

  const fetchInstitutions = async (authToken: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/instituciones", {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInstitutions(data);
      }
    } catch (error) {
      console.error("Error cargando instituciones:", error);
    }
  };

  // --- CRUD Proyectos ---
  const handleSaveProject = async () => {
    if (!formTitle || !formDescription || !formInstitutionId || !token) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const url = isEditing 
        ? `http://localhost:4000/api/proyectos/${editId}` 
        : "http://localhost:4000/api/proyectos";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: formTitle,
          descripcion: formDescription,
          institucionId: formInstitutionId
        })
      });

      if (res.ok) {
        alert(isEditing ? "Proyecto actualizado" : "Proyecto creado");
        resetForm();
        fetchProjects();
      } else {
        const err = await res.json();
        alert(`Error: ${err.msg}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProjects();
      else alert("Error al eliminar");
    } catch (error) {
      console.error(error);
    }
  };

  // --- Gestión del Formulario ---
  const handleEditClick = (project: Project) => {
    setFormTitle(project.titulo);
    setFormDescription(project.descripcion);
    setFormInstitutionId(project.institucion?._id || "");
    setIsEditing(true);
    setEditId(project._id);
    // Scroll hacia arriba suavemente para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setFormInstitutionId("");
    setIsEditing(false);
    setEditId(null);
  };

  // --- Modal de Inscritos ---
  const handleViewApps = async (projectId: string, projectTitle: string) => {
    if (!token) return;
    setLoadingApps(true);
    setCurrentProjectTitle(projectTitle);
    setShowModal(true);

    try {
      const res = await fetch(`http://localhost:4000/api/aplicaciones/proyecto/${projectId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentApps(data);
      } else {
        alert("Error cargando aplicaciones");
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: 'Aprobada' | 'Rechazada') => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:4000/api/aplicaciones/${appId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: newStatus })
      });

      if (res.ok) {
        // Actualizar estado local
        setCurrentApps(prev => prev.map(a => 
          a._id === appId ? { ...a, estado: newStatus } : a
        ));
      } else {
        alert("Error actualizando estado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-manager-container">
      <div className="admin-header">
        <h2 className="admin-title">Gestión de Proyectos</h2>
      </div>

      {/* Panel de Formulario */}
      <div className="admin-form-panel">
        <h3 className="admin-form-subtitle">
          {isEditing ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
        </h3>
        
        <div className="form-row">
          <input 
            className="admin-input"
            placeholder="Título del Proyecto"
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
          />
          <select 
            className="admin-select"
            value={formInstitutionId}
            onChange={e => setFormInstitutionId(e.target.value)}
          >
            <option value="">Institución (Elegir)</option>
            {institutions.map(i => (
              <option key={i._id} value={i._id}>{i.nombre}</option>
            ))}
          </select>
        </div>
        
        <textarea 
          className="admin-textarea"
          placeholder="Descripción detallada..."
          rows={3}
          value={formDescription}
          onChange={e => setFormDescription(e.target.value)}
        />

        <div className="admin-actions-row">
          <button className="save-btn" onClick={handleSaveProject}>
            {isEditing ? "Actualizar Proyecto" : "Publicar Proyecto"}
          </button>
          {isEditing && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Proyectos */}
      <div className="projects-list">
        {projects.map(p => (
          <div key={p._id} className="project-item">
            <div className="project-info">
              <h4 className="project-item-title">{p.titulo}</h4>
              <span className="project-item-inst">{p.institucion?.nombre}</span>
              <p className="project-item-desc">{p.descripcion}</p>
            </div>
            <div className="item-actions">
              <button 
                className="icon-btn view" 
                onClick={() => handleViewApps(p._id, p.titulo)}
                title="Ver Inscritos"
              >
                👥 Inscritos
              </button>
              <button 
                className="icon-btn edit" 
                onClick={() => handleEditClick(p)}
                title="Editar"
              >
                ✏️
              </button>
              <button 
                className="icon-btn delete" 
                onClick={() => handleDeleteProject(p._id)}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Inscritos */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Inscritos: {currentProjectTitle}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              {loadingApps ? <p>Cargando...</p> : (
                <table className="apps-table">
                  <thead>
                    <tr>
                      <th>Estudiante</th>
                      <th>Carnet</th>
                      <th>Motivación</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApps.length === 0 && (
                      <tr><td colSpan={5} style={{textAlign:'center'}}>No hay inscritos.</td></tr>
                    )}
                    {currentApps.map(app => (
                      <tr key={app._id}>
                        <td>{app.estudiante.nombre}</td>
                        <td>{app.estudiante.carnet || "N/A"}</td>
                        <td>{app.motivacion || "N/A"}</td>
                        <td>
                          <span className={`status-pill ${app.estado.toLowerCase()}`}>
                            {app.estado}
                          </span>
                        </td>
                        <td className="modal-actions">
                          {app.estado === 'Pendiente' && (
                            <>
                              <button 
                                className="mini-btn approve" 
                                onClick={() => handleUpdateStatus(app._id, 'Aprobada')}
                              >✓</button>
                              <button 
                                className="mini-btn reject" 
                                onClick={() => handleUpdateStatus(app._id, 'Rechazada')}
                              >✕</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsManager;