import { useState } from "react";
import Body from "@/components/Body_desing/Body";
import './Css_info.css';
import { useNavigate } from "react-router-dom";

const CSS = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);
  const [options, setOptions] = useState<{title: string, description: string}[]>([
    {title: "Opción 1", description: "Descripción de la opción 1"},
    {title: "Opción 2", description: "Descripción de la opción 2"},
    {title: "Opción 3", description: "Descripción de la opción 3"},
  ]);
  const [newOptionTitle, setNewOptionTitle] = useState<string>(""); // Para capturar el título de la nueva opción
  const [newOptionDescription, setNewOptionDescription] = useState<string>(""); // Para capturar la descripción de la nueva opción
  const isAdmin: boolean = true; // Simulamos el rol de administrador
  const navigate = useNavigate();

  // Función para manejar el cambio en las checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(selectedOption === value ? null : value); 
  };

  // Función para expandir el botón
  const handleButtonClick = () => {
    setIsButtonExpanded(!isButtonExpanded); 
  };

  // Función para agregar una nueva opción
  const handleAddOption = () => {
    if (newOptionTitle && newOptionDescription) {
      setOptions([...options, { title: newOptionTitle, description: newOptionDescription }]);
      setNewOptionTitle(""); // Limpiar el campo de texto después de agregar
      setNewOptionDescription(""); // Limpiar el campo de descripción después de agregar
    }
  };

  // Función para eliminar una opción
  const handleRemoveOption = (title: string) => {
    setOptions(options.filter((opt) => opt.title !== title));
  };

  // Función para redirigir al formulario
  const handleRedirect = () => {
    navigate("/horas-sociales-form");
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

        {/* Mostrar las opciones solo si el botón está expandido */}
        {isButtonExpanded && (
          <div className="checkbox-container">
            {options.map((option, index) => (
              <div className="checkbox-item" key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={option.title}
                    checked={selectedOption === option.title}
                    onChange={handleCheckboxChange}
                  />
                  <strong>{option.title}</strong>
                  <p>{option.description}</p>
                </label>

                {/* Solo el admin puede eliminar opciones */}
                {isAdmin && (
                  <button
                    onClick={() => handleRemoveOption(option.title)}
                    className="remove-option-btn"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}

            {/* Solo el admin puede agregar nuevas opciones */}
            {isAdmin && (
              <div className="add-option-container">
                <div className="add-option-item">
                  <input
                    type="text"
                    value={newOptionTitle}
                    onChange={(e) => setNewOptionTitle(e.target.value)}
                    placeholder="Agregar nuevo título de opción"
                  />
                  <textarea
                    value={newOptionDescription}
                    onChange={(e) => setNewOptionDescription(e.target.value)}
                    placeholder="Agregar descripción"
                    rows={3}
                  />
                </div>
                <button className="add-option-btn" onClick={handleAddOption}>
                  Agregar opción
                </button>
              </div>
            )}
          </div>
        )}

        {selectedOption && (
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
