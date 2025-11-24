import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./HoursForm.css";

// Definimos la interfaz para el estado que viene de la navegación
interface LocationState {
  projectTitle?: string;
  projectId?: string;
}

const HoursForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState; // Obtenemos el estado

  // Estados para datos del usuario y token
  const [token, setToken] = useState<string | null>(null);
  // userRole se usa indirectamente en el useEffect para validación, aunque no se renderiza
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userRole, setUserRole] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    motivation: "",
    socialHour: "", // Este será el título para mostrar
    projectId: "",  // Este será el ID para enviar al backend
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({
    acceptTerms: "",
    phone: "",
    general: ""
  });

  const formRef = useRef<HTMLDivElement>(null);

  // EFECTO 1: Validar Acceso y Cargar Datos Iniciales
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");

    // 1. Verificar si está logueado
    if (!storedToken || !storedUser) {
      alert("Debes iniciar sesión para acceder a este formulario.");
      navigate("/"); // Redirigir al home
      return;
    }

    const user = JSON.parse(storedUser);
    setToken(storedToken);
    setUserRole(user.rol);

    // 2. Verificar Rol (Solo estudiantes pueden aplicar)
    if (user.rol !== "usuario" && user.rol !== "estudiante") {
      alert("Solo los estudiantes pueden aplicar a horas sociales.");
      navigate("/");
      return;
    }

    // 3. Verificar si se seleccionó un proyecto desde la página anterior
    if (!state?.projectId) {
      alert("Por favor selecciona un proyecto primero desde la sección CSS.");
      navigate("/css");
      return;
    }

    // 4. Pre-llenar datos del formulario
    setFormData(prev => ({
      ...prev,
      name: user.nombre || "",
      email: user.correo || "",
      studentId: user.carnet || "", // Asumiendo que el objeto usuario tiene 'carnet'
      phone: user.telefono || "",   // Asumiendo que tiene 'telefono'
      socialHour: state.projectTitle || "Proyecto Seleccionado",
      projectId: state.projectId || ""
    }));

  }, [navigate, state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      if (checked) {
        setErrors((prev) => ({ ...prev, acceptTerms: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Limpiar error de teléfono al escribir
      if (name === "phone") setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  // Validación simple de teléfono (formato 0000-0000 o 8 dígitos)
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{4}-?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ acceptTerms: "", phone: "", general: "" });

    // Validaciones Frontend
    if (!formData.acceptedTerms) {
      setErrors(prev => ({ ...prev, acceptTerms: "Debes aceptar los términos y condiciones." }));
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: "Ingresa un teléfono válido (ej: 7777-7777)" }));
      return;
    }

    if (!token) {
      alert("Error de sesión. Por favor inicia sesión nuevamente.");
      return;
    }

    try {
      // Petición al Backend
      const response = await fetch("http://localhost:4000/api/aplicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Datos para actualizar perfil de usuario (si el backend lo soporta así)
          phone: formData.phone,
          studentId: formData.studentId,

          // Datos de la aplicación
          motivation: formData.motivation,
          socialHour: formData.projectId, // Enviamos el ID real del proyecto
          acceptedTerms: formData.acceptedTerms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ÉXITO
        console.log("Aplicación creada:", data);

        // Generar el comprobante PDF
        await generatePDF();

        alert("¡Aplicación enviada exitosamente!");
        navigate("/css"); // Redirigir al usuario después del éxito

      } else {
        // Error del backend (ej: ya aplicaste, proyecto lleno, etc.)
        setErrors(prev => ({ ...prev, general: data.msg || "Error al procesar la solicitud" }));
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrors(prev => ({ ...prev, general: "No se pudo conectar con el servidor." }));
    }
  };

  const generatePDF = async () => {
    if (!formRef.current) return;

    try {
      // Ocultar botones temporalmente para el PDF
      const buttons = formRef.current.querySelectorAll('button');
      buttons.forEach(btn => btn.style.display = 'none');

      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff" // Fondo blanco para el PDF
      });

      // Restaurar botones
      buttons.forEach(btn => btn.style.display = '');

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;

      pdf.text("Comprobante de Inscripción - Servicio Social UCA", 105, 15, { align: "center" });

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.setFontSize(10);
      pdf.text(
        `Generado el: ${new Date().toLocaleString()}`,
        10,
        pdfHeight - 10
      );

      pdf.save(`comprobante-${formData.studentId}.pdf`);

    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("La aplicación se guardó, pero hubo un error al generar el PDF.");
    }
  };

  return (
    <div className="hours-form-container">
      <h2>Formulario de Aplicación</h2>
      {errors.general && (
        <div className="error-banner">
          {errors.general}
        </div>
      )}

      {/* El ref se usa para capturar este div en el PDF */}
      <div ref={formRef} className="form-content-wrapper">
        <form onSubmit={handleSubmit} className="hours-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              readOnly // Campo de solo lectura, viene del perfil
              className="read-only-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly // Campo de solo lectura
              className="read-only-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0000-0000"
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Carnet de estudiante:</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="00012345"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="socialHour">Proyecto a inscribir:</label>
            <input
              type="text"
              id="socialHour"
              name="socialHour"
              value={formData.socialHour}
              readOnly
              className="project-selected-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivacion">Razón de inscripción:</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={4}
              placeholder="Explica brevemente por qué quieres participar en este proyecto..."
              required
            ></textarea>
          </div>

          <div className="form-warning">
            <h2 className="form-title">Importante</h2>
            <p>
              Es obligatorio que reportes tú recuento de horas realizadas, y que
              sean recopiladas en la hoja de horario que se te proporcionara el
              encargado de la opcion de servicio social que has escogido; al igual
              que es obligatorio que descargues dicha hoja en caso de perdidas. En
              caso contrario, sin registro de tus horas sociales, no se contaran
              en tu registro personal y se dara por hecho como no realizadas.
            </p>

            <p>
              Es obligatorio que despues de haber reportado tus horas sociales y
              haber cumplido con el total de seisientas horas deberas crear un
              informe final de tu servicio social estudiantil, sin este no se
              tomara como completado tu servicio social, las indicaciones puedes
              encontrarlas en los siguientes enlaces:
            </p>

            <ol>
              <li>
                <a href="/Guia-informe-final.pdf" target="_blank" rel="noopener noreferrer">
                  Guía de elaboración de reporte final
                </a>
              </li>
              <li>
                <a href="/Control-de-Asistencia.pdf" target="_blank" rel="noopener noreferrer">Control de asistencia</a>
              </li>
            </ol>
          </div>

          <div className="form-group checkbox-group">
            <input
              className="check-conditions"
              type="checkbox"
              id="acceptedTerms"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            <label className="check-info" htmlFor="acceptedTerms">
              He leído y acepto las responsabilidades y condiciones que conlleva
              realizar mi servicio social.
            </label>
          </div>
          {errors.acceptTerms && (
            <div className="terms-error-container">
              <span className="error-message">{errors.acceptTerms}</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={!formData.acceptedTerms}
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HoursForm;