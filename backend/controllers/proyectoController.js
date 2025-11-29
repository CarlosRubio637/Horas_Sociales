import Proyecto from "../models/Proyecto.js";
import Institucion from "../models/Institucion.js";

export const createProyecto = async (req, res) => {
  try {
    console.log("--- DEBUG: Intentando crear proyecto ---");
    console.log("Body recibido:", req.body);

    const { titulo, descripcion, facultad, activo, institucion, institucionId } = req.body;

    const idInstitucionFinal = institucion || institucionId;

    console.log("ID Institución detectado:", idInstitucionFinal);

    if (!idInstitucionFinal) {
      return res.status(400).json({ 
        msg: "El campo de Institución es obligatorio (envíe 'institucion' o 'institucionId')." 
      });
    }

    //Verificar que la institución exista
    const instEncontrada = await Institucion.findById(idInstitucionFinal);
    
    if (!instEncontrada) {
      console.error(`Institución con ID ${idInstitucionFinal} no encontrada en BD.`);
      return res
        .status(404)
        .json({ msg: `La institución especificada no existe (ID: ${idInstitucionFinal})` });
    }

    //Se crea el proyecto
    const proyecto = new Proyecto({
      titulo,
      descripcion,
      facultad: Array.isArray(facultad) ? facultad : [facultad || "Otras"],
      institucion: idInstitucionFinal, 
      activo: activo !== undefined ? activo : true,
      publicadoPor: req.usuario.id, 
    });

    await proyecto.save();

    console.log("Proyecto guardado con éxito:", proyecto._id);

    res
      .status(201)
      .json({ msg: "Proyecto creado exitosamente", data: proyecto });

  } catch (error) {
    console.error("Error CRÍTICO en createProyecto:", error);
    res.status(500).json({ msg: "Error en el servidor al crear el proyecto." });
  }
};

export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ activo: true })
      .populate("institucion", "nombre correo telefono")
      .populate("publicadoPor", "nombre");

    res.status(200).json(proyectos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los proyectos." });
  }
};

// Get para obtener un proyecto por ID 
export const getProyectoById = async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id).populate('institucion', 'nombre contacto');
    
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    
    res.status(200).json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el proyecto" });
  }
};

export const updateProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, facultad, activo, institucion, institucionId } = req.body;

    const idInstitucionNueva = institucion || institucionId;

    // Verificar si el proyecto existe
    let proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    proyecto.titulo = titulo || proyecto.titulo;
    proyecto.descripcion = descripcion || proyecto.descripcion;

    if (facultad) {
        proyecto.facultad = Array.isArray(facultad) ? facultad : [facultad];
    }

    if (activo !== undefined) {
      proyecto.activo = activo;
    }

    if (idInstitucionNueva) {
      const instExiste = await Institucion.findById(idInstitucionNueva);
      if (!instExiste) {
        return res
          .status(404)
          .json({ msg: "La institución especificada no existe." });
      }
      proyecto.institucion = idInstitucionNueva;
    }

    const proyectoActualizado = await proyecto.save();
    res
      .status(200)
      .json({ msg: "Proyecto actualizado", data: proyectoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el proyecto." });
  }
};

export const deleteProyecto = async (req, res) => {
  try {
    const { id } = req.params;

    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    proyecto.activo = false;
    await proyecto.save();

    res.status(200).json({ msg: "Proyecto marcado como inactivo." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el proyecto." });
  }
};