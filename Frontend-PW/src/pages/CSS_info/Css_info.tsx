import Body from "@/components/Body_desing/Body";
import './Css_info.css';
const CSS = () => {
  console.log('Esta vain si furula');
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
            acuerdas, según tus horarios, intereses y conocimientos, el proyecto o
            actividad en el que apoyarás para iniciar tus horas sociales. Desde tu
            correo institucional puedes solicitar mayor información. 
          </li>
          <li className="step__item">
            Selecciona la opción que más te convenga, elabora un plan de trabajo y mantén
            comunicación periódica con el coordinador del Servicio Socia
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
          <li>Horas Requeridas
              La cantidad de horas de servicio social a acumular varía según el nivel de la carrera:
              Estudiantes de Nivel Técnico: Deben acumular 150 horas de servicio social.
              Estudiantes de Ingeniería, Arquitectura y Licenciatura: Deben acumular 600 horas de servicio social.
          </li>
          <li> 
              Obligaciones del Estudiante
              Para la correcta prestación del Servicio Social, el estudiante tiene las siguientes obligaciones:
              Oportunidad: Prestar el servicio social antes de iniciar el proceso de graduación.
              Información: Informarse oportunamente sobre las posibilidades y modalidades para realizar el servicio social.
              Reporte: El reporte de horas efectuadas debe ser acompañado de la hoja de control de asistencia.
          </li>
          <li>
            Disposiciones Generales
            El Servicio Social puede ser interno (en proyectos de la UCA) o externo (en instituciones de la sociedad civil, gubernamentales, etc.).
            El estudiante tiene derecho a elegir o proponer la modalidad del servicio social que desea realizar, siempre que cumpla con los requisitos.
          </li>
        </ol>
        </div>
      </section>

      <section className="information-option">
        <div className="information-content">
          
        </div>
      </section>
    </Body>
  );
};

export default CSS;
