import { useState, useEffect } from "react";
import Body from "@/components/Body_desing/Body";
import './Css_info.css';
import { useNavigate } from "react-router-dom";

// Interfaces para los tipos de datos que vienen del backend
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

const CSS = () => {
  const navigate = useNavigate();
  
  // Estados de Datos
  const [projects, setProjects] = useState<Project[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Interfaz
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Estados del Formulario (Crear/Editar)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formInstitutionId, setFormInstitutionId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      if (user.rol === 'admin' || user.rol === 'administrador') {
        setIsAdmin(true);
        setToken(storedToken);
        fetchInstitutions(storedToken); 
      }
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/proyectos");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error cargando proyectos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstitutions = async (authToken: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/instituciones", {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setInstitutions(data);
      }
    } catch (error) {
      console.error("Error cargando instituciones:", error);
    }
  };

  const handleCheckboxChange = (projectId: string) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  const handleButtonClick = () => {
    setIsButtonExpanded(!isButtonExpanded);
  };

  const handleSaveProject = async () => {
    if (!formTitle || !formDescription || !formInstitutionId || !token) {
      alert("Por favor completa todos los campos, incluyendo la institución.");
      return;
    }

    try {
      const url = isEditing 
        ? `http://localhost:4000/api/proyectos/${editId}`
        : "http://localhost:4000/api/proyectos";
      
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
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

      if (response.ok) {
        alert(isEditing ? "Proyecto actualizado" : "Proyecto creado exitosamente");
        setFormTitle("");
        setFormDescription("");
        setFormInstitutionId("");
        setIsEditing(false);
        setEditId(null);
        fetchProjects();
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.msg}`);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión");
    }
  };

  const handleRemoveOption = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta opción?")) return;
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProjects(); 
      } else {
        alert("Error al eliminar el proyecto");
      }
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const handleEditClick = (project: Project) => {
    setFormTitle(project.titulo);
    setFormDescription(project.descripcion);
    setFormInstitutionId(project.institucion?._id || "");
    setIsEditing(true);
    setEditId(project._id);
    if (!isButtonExpanded) setIsButtonExpanded(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormTitle("");
    setFormDescription("");
    setFormInstitutionId("");
  };

  const handleRedirect = () => {
    const selectedProject = projects.find(p => p._id === selectedProjectId);
    navigate("/horas-sociales-form", { 
      state: { 
        projectTitle: selectedProject?.titulo,
        projectId: selectedProjectId 
      } 
    });
  };

  return (
    <Body>
      <section className="presentation-container">
        <div className="presentation-title">
          <h1 className="title">Servicio Social</h1>
        </div>
      </section>

      <section className="info-content">
        <h2>¿Cómo inicio mi servicio social?</h2>
        <ol className="info__steps">
          <li className="step__item">
            Abrir tu expediente en las oficinas del Centro de Servicio Social.
          </li>
          <li className="step__item">
            Entrevistarte con el coordinador de servicio social, con quien
            acuerdas, según tus horarios, intereses y conocimientos, el proyecto
            o actividad en el que apoyarás para iniciar tus horas sociales.
          </li>
          <li className="step__item">
            Selecciona la opción que más te convenga, elabora un plan de trabajo
            y mantén comunicación periódica con el coordinador del Servicio Social.
          </li>
        </ol>
      </section>

      <section className="rule-content">
        <h2 className="rule__title">Reglamento y requisitos</h2>
        <div className="rule-desing">
          <p>
            Requisitos Clave para Realizar el Servicio Social Estudiantil (UCA)...
          </p>
          <ol className="rule__steps">
            <li>
              <strong>Horas Requeridas:</strong> Estudiantes de Nivel Técnico: 150 horas. Ingeniería/Licenciatura: 600 horas.
            </li>
            <li>
              <strong>Obligaciones:</strong> Prestar el servicio antes de graduarse e informarse oportunamente.
            </li>
            <li>
              <strong>Disposiciones:</strong> Puede ser interno o externo.
            </li>
          </ol>
        </div>
      </section>

      <section className="information-option">
        <button
          className={`expanding-button ${isButtonExpanded ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          {loading ? "Cargando opciones..." : "Opciones de Servicio Social"}
        </button>

        {isButtonExpanded && (
          <div className="checkbox-container">
            {projects.length === 0 && <p>No hay proyectos activos disponibles por el momento.</p>}
            
            {projects.map((project) => (
              <div className={`checkbox-item ${isAdmin ? 'admin-view' : ''}`} key={project._id}>
                <label>
                  <input
                    type="checkbox"
                    value={project._id}
                    checked={selectedProjectId === project._id}
                    onChange={() => handleCheckboxChange(project._id)}
                  />
                  <strong>{project.titulo}</strong>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "5px" }}>
                    {project.institucion?.nombre}
                  </span>
                  <p>{project.descripcion}</p>
                </label>

                {isAdmin && (
                  <div className="admin-actions-group">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditClick(project)}
                    >
                      Editar
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleRemoveOption(project._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Funciones de Admin */}
            {isAdmin && (
              <div className="admin-panel-container">
                <h3 className="admin-form-title">
                  {isEditing ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
                </h3>
                
                <textarea
                  className="admin-input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Título del Proyecto"
                />
                
                <select 
                  className="admin-select"
                  value={formInstitutionId}
                  onChange={(e) => setFormInstitutionId(e.target.value)}
                >
                  <option value="">-- Seleccione una Institución --</option>
                  {institutions.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.nombre}
                    </option>
                  ))}
                </select>

                <textarea
                  className="admin-textarea"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Descripción del proyecto"
                  rows={3}
                />
                
                <div className="admin-form-actions">
                  <button className="add-option-btn" onClick={handleSaveProject}>
                    {isEditing ? "Actualizar" : "Publicar"}
                  </button>
                  
                  {isEditing && (
                    <button 
                      className="cancel-option-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedProjectId && (
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleRedirect}>
              Ir al formulario
            </button>
          </div>
        )}
      </section>
    </Body>
  );
};

export default CSS;