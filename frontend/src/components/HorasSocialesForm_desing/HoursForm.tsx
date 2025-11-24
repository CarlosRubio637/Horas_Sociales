import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./HoursForm.css";

const HoursForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    motivation: "",
    socialHour: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({
    acceptTerms: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      setErrors({ acceptTerms: "Debes aceptar los términos y condiciones." });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Error: No estás autenticado. Por favor inicia sesión.");
      return;
    }

    try {
      // 3. Petición al Backend

      const response = await fetch("http://localhost:4000/api/aplicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // Va a actualizar al Usuario
          studentId: formData.studentId, // Va a actualizar al Usuario (carnet)
          motivation: formData.motivation,
          socialHour: formData.socialHour,
          acceptedTerms: formData.acceptedTerms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ÉXITO
        console.log("Aplicación creada:", data);
        alert("¡Aplicación enviada exitosamente!");

        generatePDF();

        setFormData({ ...formData, motivation: "", acceptedTerms: false });
      } else {
        console.error("Error backend:", data.msg);
        alert(`Error: ${data.msg}`);
      }
    } catch (error) {
      // ERROR DE RED
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const generatePDF = async () => {
    if (!formRef.current) return;

    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.setFontSize(8);
      pdf.setTextColor(100);
      pdf.text(
        `Estudiante: ${formData.name} - Carnet: ${formData.studentId}`,
        10,
        1
      );

      pdf.text(
        `Fecha: ${new Date().toLocaleDateString()} - Hora: ${
          new Date().toLocaleTimeString
        }`,
        10,
        15
      );

      pdf.save(`comprobante-servicio-social-${formData.studentId}.pdf`);

      alert(
        "¡Solisitud enviada! Y se ha descargado un comprobante de tu inscripción"
      );

      //reseteo de formulario T_T
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentId: "",
        motivation: "",
        socialHour: "",
        acceptedTerms: false,
      });
    } catch (error) {
      console.error("Ha ocurrido un error a generar el PDF:", error);
      alert(
        "Error al generar el comprobante de inscripción. Por favor intenta nuevamente."
      );
    }
  };

  return (
    <div className="hours-form-container">
      <h2>Formulario de aplicación</h2>

      <form onSubmit={handleSubmit} className="hours-form">
        <div className="form-group">
          <label htmlFor="name">Ingresa tú nombre completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="carnet@uca.edu.sv"
            required
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

        {/*Aca el backend hara que cuando se seleccione una hora social se auto rellene este campo en el formulario cuando
            quiera aplicar a la hora social */}
        <div className="form-group">
          <label htmlFor="socialHour">Hora social inscrita:</label>
          <input
            type="text"
            id="socialHour"
            name="socialHour"
            value={formData.socialHour}
            onChange={handleChange}
            placeholder=" "
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="motivacion">Razón de inscripcion:</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows={4}
            placeholder="Explica tu motivo de inscripción"
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
              <a href="/Guia-informe-final.pdf">
                Guía de elaboración de reporte final
              </a>
            </li>
            <li>
              <a href="/Control-de-Asistencia.pdf">Control de asistencia</a>
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
          <label className="check-info" htmlFor="checkbox">
            He leído y acepto las responsabilidades y condiciones que conyeva
            realizar mi servicio social
          </label>
          {errors.acceptTerms && (
            <span className="error-message">{errors.acceptTerms}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.acceptedTerms}
          >
            Envia tu solicitud
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoursForm;
