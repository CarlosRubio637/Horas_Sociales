import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInscription.css";

const FACULTADES = [
  "Ciencias Sociales y Humanidades",
  "Ingeniería y Arquitectura",
  "Ciencias Económicas y Empresariales",
  "Otras"
];

interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  facultad: string[];
  institucion: { nombre: string };
}

const StudentInscription = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Estados para filtros
  const [filterFacultad, setFilterFacultad] = useState<string>("Todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:4000/api/proyectos")
      .then(res => res.json())
      .then(data => {
        // Normalización de datos: aseguramos que 'facultad' sea siempre un array
        const lista = Array.isArray(data) ? data : data.proyectos || [];
        const listaSegura = lista.map((p: any) => ({
          ...p,
          facultad: Array.isArray(p.facultad)
            ? p.facultad
            : [p.facultad || "Otras"],
        }));
        setProjects(listaSegura);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getFilteredProjects = () => {
    let result = [...projects];

    // Filtro por Facultad
    if (filterFacultad !== "Todas") {
      result = result.filter((p) => p.facultad.includes(filterFacultad));
    }

    // Orden Alfabético
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.titulo.localeCompare(b.titulo);
      } else {
        return b.titulo.localeCompare(a.titulo);
      }
    });

    return result;
  };

  const visibleProjects = getFilteredProjects();

  const handleInscribir = (project: Project) => {
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
        <>
          {/* Barra de filtros */}
          <div className="filters-bar">
            <div className="filter-group">
              <label>Filtrar por Facultad:</label>
              <select
                className="filter-select"
                value={filterFacultad}
                onChange={(e) => setFilterFacultad(e.target.value)}
              >
                <option value="Todas">Ver todas</option>
                {FACULTADES
                    .filter(f => f) 
                    .map((f) => (
                      <option key={f} value={f}>{f}</option>
                  ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Orden Alfabético:</label>
              <div className="sort-buttons-container">
                <button
                  className={`sort-btn ${sortOrder === "asc" ? "active" : ""}`}
                  onClick={() => setSortOrder("asc")}
                >
                  A - Z
                </button>
                <button
                  className={`sort-btn ${sortOrder === "desc" ? "active" : ""}`}
                  onClick={() => setSortOrder("desc")}
                >
                  Z - A
                </button>
              </div>
            </div>
          </div>

          {/* --- LISTA DE PROYECTOS --- */}
          <div className="project-grid">
            {visibleProjects.length === 0 && (
                <div style={{gridColumn: '1 / -1'}}>
                    <p className="no-results-text">No se encontraron proyectos con los filtros seleccionados.</p>
                </div>
            )}
            
            {visibleProjects.map(p => (
              <div key={p._id} className="project-card">
                <h3 className="project-card-title">{p.titulo}</h3>
                
                {/* Mostrar etiquetas de facultad */}
                <div>
                    {p.facultad.map((fac, idx) => (
                      <span key={idx} className="facultad-badge">
                        {fac}
                      </span>
                    ))}
                </div>

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
        </>
      )}
    </div>
  );
};

export default StudentInscription;