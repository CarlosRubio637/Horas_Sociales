import { useState } from "react";
import Body from "@/components/Body_desing/Body";
import './Programas.css';

type ProgramKey = 'RefuerzoAcademico' | 'Voluntariado';

const Programas = () => {
  const [isProgramExpanded, setIsProgramExpanded] = useState<Record<ProgramKey, boolean>>({
    RefuerzoAcademico: false,
    Voluntariado: false
  });

  const toggleProgram = (program: ProgramKey) => {
    setIsProgramExpanded(prev => ({
      ...prev,
      [program]: !prev[program]
    }));
  };

  return (
    <Body>
      <section className="presentation-container">
        <div className="presentation-title">
          <h1 className="title">Programas de Formación</h1>
        </div>
      </section>

      <section className="info-content">
        <h2>El Centro de Servicio Social de la UCA ofrece diversos programas de formación para los estudiantes, enfocados en la práctica social y la solidaridad.</h2>
      </section>

      <section className="information-option">
        {/* Botón y expansión para Refuerzo Academico */}
        <button
          className="expanding-button"
          onClick={() => toggleProgram("RefuerzoAcademico")}
        >
          Círculos de Estudio
        </button>
        {isProgramExpanded.RefuerzoAcademico && (
          <div className="program-details">
            <p>Objetivo general:</p>
            <p>Brindar apoyo académico a estudiantes de secundaria y universidad que presentan dificultades en asignaturas clave de sus estudios, contribuyendo a mejorar su desempeño académico y motivación para seguir adelante con sus estudios.</p>

            <p>¿De qué se trata este programa?</p>
            <p>Este programa busca incentivar la superación académica de jóvenes que enfrentan barreras económicas o personales para acceder a una educación de calidad. Los estudiantes, bajo la supervisión de tutores y en coordinación con los docentes, reciben apoyo personalizado en asignaturas como matemáticas, ciencias, lengua y literatura, entre otras.</p>

            <p>El programa se desarrolla durante el año escolar, ofreciendo clases de apoyo los fines de semana o en horarios disponibles, con el acompañamiento de voluntarios del servicio social que ayudarán a los estudiantes a mejorar sus habilidades y obtener los conocimientos necesarios para superar sus exámenes y alcanzar sus objetivos académicos.</p>
          </div>
        )}

        {/* Botón y expansión para Programa Joaquín López y López */}
        <button
          className="expanding-button"
          onClick={() => toggleProgram("Voluntariado")}
        >
          Programa Joaquín López y López
        </button>
        {isProgramExpanded.Voluntariado && (
          <div className="program-details">
            <p>Objetivo general:</p>
             <p> Fomentar el compromiso social de los estudiantes universitarios a través de su participación en proyectos comunitarios que buscan atender las necesidades más urgentes de los sectores menos favorecidos de la comunidad.</p>

             <p> ¿De qué se trata este programa?</p>
             <p>Este programa involucra a los estudiantes en labores de apoyo directo en comunidades de escasos recursos. Los voluntarios trabajarán en centros de atención comunitaria, participando en actividades como la distribución de alimentos, la organización de talleres de sensibilización, el acompañamiento en actividades recreativas para niños y la asistencia en proyectos educativos. Los estudiantes en servicio social también serán responsables de organizar y gestionar actividades en los centros de apoyo.</p>

             <p>El propósito principal es ayudar a las comunidades a mejorar su bienestar social mientras se promueve la solidaridad entre los estudiantes, quienes aportarán su tiempo y energía para el beneficio de la sociedad.</p>
          </div>
        )}
      </section>
    </Body>
  );
};

export default Programas;
