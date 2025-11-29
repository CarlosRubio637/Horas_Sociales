import { useState, useEffect } from "react";
import Body from "@/components/Body_design/Body";
import "./Css_info.css";

const FACULTADES = [
  "Ciencias Sociales y Humanidades",
  "Ingeniería y Arquitectura",
  "Ciencias Económicas y Empresariales",
  "Otras",
];

//Nueva interfaz de projecto (con facultad y array de string)
interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  facultad: string[];
  institucion: { nombre: string };
}

const CSS = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  const [filterFacultad, setFilterFacultad] = useState<string>("Todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:4000/api/proyectos")
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.proyectos || [];
        const listaSegura = lista.map((p: any) => ({
          ...p,
          facultad: Array.isArray(p.facultad)
            ? p.facultad
            : [p.facultad || "Otras"],
        }));

        setProjects(listaSegura);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const getFilteredProjects = () => {
    let result = [...projects];

    //Filtro por Facultad
    if (filterFacultad !== "Todas") {
      result = result.filter((p) => p.facultad.includes(filterFacultad));
    }

    //Orden Alfabético
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

  const handleButtonClick = () => {
    setIsButtonExpanded(!isButtonExpanded);
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
            y mantén comunicación periódica con el coordinador del Servicio
            Social.
          </li>
        </ol>
      </section>

      <section className="rule-content">
        <h2 className="rule__title">Reglamento y requisitos</h2>
        <div className="rule-desing">
          <p>
            Requisitos Clave para Realizar el Servicio Social Estudiantil
            (UCA)...
          </p>
          <ol className="rule__steps">
            <li>
              <strong>Horas Requeridas:</strong> Estudiantes de Nivel Técnico:
              150 horas. Ingeniería/Licenciatura: 600 horas.
            </li>
            <li>
              <strong>Obligaciones:</strong> Prestar el servicio antes de
              graduarse e informarse oportunamente.
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
          {loading ? "Cargando..." : "Ver Opciones Disponibles"}
        </button>

        {isButtonExpanded && (
          <div className="checkbox-container">
            {/* --- BARRA DE FILTROS --- */}
            <div className="filters-bar">
              <div className="filter-group">
                <label>Facultad:</label>
                <select
                  className="filter-select"
                  value={filterFacultad}
                  onChange={(e) => setFilterFacultad(e.target.value)}
                >
                  <option value="Todas">Todas las Facultades</option>
                  {FACULTADES
                      .filter(f => f !== "Otras") 
                      .map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Orden:</label>
                <div style={{ display: "flex" }}>
                  <button
                    className={`sort-btn ${
                      sortOrder === "asc" ? "active" : ""
                    }`}
                    onClick={() => setSortOrder("asc")}
                  >
                    A-Z
                  </button>
                  <button
                    className={`sort-btn ${
                      sortOrder === "desc" ? "active" : ""
                    }`}
                    onClick={() => setSortOrder("desc")}
                  >
                    Z-A
                  </button>
                </div>
              </div>
            </div>

            {/* LISTA DE PROYECTOS FILTRADA */}
            {visibleProjects.length === 0 && (
              <p
                style={{ textAlign: "center", color: "#666", padding: "20px" }}
              >
                No se encontraron proyectos con los filtros seleccionados.
              </p>
            )}

            {visibleProjects.map((project) => (
              <div className="checkbox-item" key={project._id}>
                <label style={{ cursor: "default" }}>
                  <strong>{project.titulo}</strong>

                  <div>
                    {project.facultad.map((fac, idx) => (
                      <span key={idx} className="facultad-badge">
                        {fac}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "#666",
                      marginBottom: "5px",
                    }}
                  >
                    {project.institucion?.nombre}
                  </span>
                  <p>{project.descripcion}</p>
                </label>
              </div>
            ))}

            {/* --- Call to Action para Login --- */}
            <div className="cta-login-container">
              <h3 style={{ color: "#2A5091", marginTop: 0 }}>
                ¿Listo para inscribirte?
              </h3>
              <p style={{ marginBottom: "0" }}>
                Inicia sesión y ve a tu <strong>Panel de Usuario</strong> para
                gestionar tu inscripción.
              </p>
            </div>
          </div>
        )}
      </section>
    </Body>
  );
};

export default CSS;
