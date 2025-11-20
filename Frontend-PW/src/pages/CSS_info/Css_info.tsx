import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Body from "@/components/Body_desing/Body";
import './Css_info.css';

const CSS = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);
  const navigate = useNavigate(); 

  // Función para manejar el cambio en las checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(selectedOption === value ? null : value); 
  };

  // Función para manejar la redirección al formulario
  const handleFormVisibility = () => {
    if (selectedOption) {
      navigate("/horas-sociales-form"); 
    }
  };

  // Función para expandir el botón
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
          <p>
            Requisitos Clave para Realizar el Servicio Social Estudiantil (UCA) El
            Servicio Social es un requisito obligatorio y previo para iniciar el
            proceso de graduación en la Universidad, de acuerdo con la Ley de
            Educación Superior. Los aspectos clave que todo estudiante debe seguir
            son:
          </p>

          <ol className="rule__steps">
            <li>
              Horas Requeridas
              <br />
              La cantidad de horas de servicio social a acumular varía según el nivel de la carrera:
              <br />
              Estudiantes de Nivel Técnico: Deben acumular 150 horas de servicio social.
              <br />
              Estudiantes de Ingeniería, Arquitectura y Licenciatura: Deben acumular 600 horas de servicio social.
            </li>
            <li>
              Obligaciones del Estudiante
              <br />
              Para la correcta prestación del Servicio Social, el estudiante tiene las siguientes obligaciones:
              <br />
              Oportunidad: Prestar el servicio social antes de iniciar el proceso de graduación.
              <br />
              Información: Informarse oportunamente sobre las posibilidades y modalidades para realizar el servicio social.
              <br />
              Reporte: El reporte de horas efectuadas debe ser acompañado de la hoja de control de asistencia.
            </li>
            <li>
              Disposiciones Generales
              <br />
              El Servicio Social puede ser interno (en proyectos de la UCA) o externo (en instituciones de la sociedad civil, gubernamentales, etc.).
              <br />
              El estudiante tiene derecho a elegir o proponer la modalidad del servicio social que desea realizar, siempre que cumpla con los requisitos.
            </li>
          </ol>
        </div>
      </section>

      <section className="information-option">
        {/* Botón expansible */}
        <button
          className={`expanding-button ${isButtonExpanded ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          Opciones de Servicio Social
        </button>

        {isButtonExpanded && (
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                value="Opción 1"
                checked={selectedOption === "Opción 1"}
                onChange={handleCheckboxChange}
              />
              -SEGURIDAD-
              
              Se busca alguien que trabaje de 12:00 am a 6:00 am en el área de seguridad de Freddy's fazbear pizza de lunes a viernes por una semana.
              Se tomara como horas sociales completas al llevar la jornada completa durante el preiodo establecido, de estar interesado ponerse en contacto con la administración.
            </label>
            <label>
              <input
                type="checkbox"
                value="Opción 2"
                checked={selectedOption === "Opción 2"}
                onChange={handleCheckboxChange}
              />
              -LEVANTA CON NOSOTROS EL FUTURO- 

              Ayuda a construir viviendas para familias de bajos recursos los fines de semana por un mes, las jornadaz seran de 12 horas desde las 8:00 am a las 8:00 pm con transporte incluido desde la universidad hasta el lugar del trabajo.
              Se incluye tambien una merienda ligera durante el descanso y el el equipo de seguridad necesario para realizar las labores, contacta con nosotros para mas informacion a travez de administracion.
            </label>
            <label>
              <input
                type="checkbox"
                value="Opción 3"
                checked={selectedOption === "Opción 3"}
                onChange={handleCheckboxChange}
              />
              -ENSEÑA ROBÓTICA, INSPIRA EL FUTURO-

              ¡Sé parte de la formación de la próxima generación de ingenieros! Únete como profesor de robótica en una escuela local, donde podrás enseñar a los jóvenes conceptos fundamentales sobre robótica y programación.
              Las sesiones serán de 4 horas cada fin de semana durante un mes, desde las 9:00 a.m. hasta la 1:00 p.m..
              Además, contarás con todo el material necesario (kits de robótica, computadoras, etc.) para realizar las actividades. También se proporcionará apoyo logístico para el transporte si es necesario.
              Si estás interesado, por favor contacta con la administración para más detalles.
            </label>
          </div>
        )}

        {selectedOption && (
          <button
            className="submit-button"
            onClick={handleFormVisibility}
          >
            Ir al formulario
          </button>
        )}
      </section>
    </Body>
  );
};

export default CSS;
