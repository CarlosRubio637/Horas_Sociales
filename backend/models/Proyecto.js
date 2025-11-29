import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    facultad: {
      type: [String],
      required: true,
      enum: [
        "Ciencias Sociales y Humanidades",
        "Ingeniería y Arquitectura",
        "Ciencias Económicas y Empresariales",
        "Otras" //Fallback
      ],
      default: ["Otras"]
    },
    institucion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institucion",
      required: true,
    },
    publicadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
export default Proyecto;