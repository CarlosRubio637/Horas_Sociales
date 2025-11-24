import { useState, useEffect } from "react";
import Body from "@/components/Body_design/Body";
import './Css_info.css';

interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  institucion: { nombre: string };
}

const CSS = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/proyectos")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
            y mantén comunicación periódica con el coordinador del Servicio Social.
          </li>
        </ol>
      </section>

      <section className="rule-content">
        <h2 className="rule__title">Reglamento y requisitos</h2>
        <div className="rule-desing">
          <p>Requisitos Clave para Realizar el Servicio Social Estudiantil (UCA)...</p>
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
          {loading ? "Cargando..." : "Ver Opciones Disponibles"}
        </button>

        {isButtonExpanded && (
          <div className="checkbox-container">
            {projects.map((project) => (
              <div className="checkbox-item" key={project._id}>
                <label style={{cursor: 'default'}}>
                  <strong>{project.titulo}</strong>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "5px" }}>
                    {project.institucion?.nombre}
                  </span>
                  <p>{project.descripcion}</p>
                </label>
              </div>
            ))}
            
            <div className="cta-login-container" style={{
                textAlign: 'center', 
                marginTop: '30px', 
                padding: '20px', 
                background: 'white', 
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{color: '#2A5091'}}>¿Listo para inscribirte?</h3>
                <p style={{marginBottom: '0'}}>Inicia sesión y ve a tu <strong>Panel de Usuario</strong> para gestionar tu inscripción.</p>
            </div>
          </div>
        )}
      </section>
    </Body>
  );
};

export default CSS;