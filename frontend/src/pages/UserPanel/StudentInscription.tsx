import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInscription.css";

interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  institucion: { nombre: string };
}

const StudentInscription = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/proyectos")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleInscribir = (project: Project) => {
    // Redirigimos al formulario existente, pasando los datos del proyecto
    navigate("/horas-sociales-form", { 
      state: { 
        projectTitle: project.titulo, 
        projectId: project._id 
      } 
    });
  };

  return (
    <div className="inscription-container">
      <h2 className="inscription-title">Inscribir Proyecto</h2>
      
      {loading ? (
        <p className="loading-text">Cargando proyectos disponibles...</p>
      ) : (
        <div className="project-grid">
          {projects.length === 0 && <p>No hay proyectos disponibles.</p>}
          
          {projects.map(p => (
            <div key={p._id} className="project-card">
              <h3 className="project-card-title">{p.titulo}</h3>
              <span className="project-card-inst">{p.institucion?.nombre}</span>
              <p className="project-card-desc">{p.descripcion}</p>
              <button 
                onClick={() => handleInscribir(p)}
                className="inscription-btn"
              >
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentInscription;