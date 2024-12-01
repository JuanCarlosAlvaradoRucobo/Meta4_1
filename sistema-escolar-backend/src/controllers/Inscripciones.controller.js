import { Curso, Inscripciones, Alumno } from '../modelos/index.js';

// Obtener todas las inscripciones
export const getInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripciones.findAll(); // Asegúrate de que la conexión a la base de datos esté funcionando
        res.json({ success: true, inscripciones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener inscripciones' });
    }
};

// Crear una nueva inscripción
export const createInscripcion = async (req, res) => {
    try {
        const { fecha_inscripcion, oportunidad, calificacion, estado, matricula_alumno, numeroserie_curso } = req.body;

        // Validaciones previas (opcional)
        if (!matricula_alumno || !numeroserie_curso) {
            return res.status(400).json({ message: 'matricula_alumno y numeroserie_curso son requeridos' });
        }

        const newInscripcion = await Inscripciones.create({
            fecha_inscripcion: fecha_inscripcion || new Date(),
            oportunidad: oportunidad || Math.floor(Math.random() * 30) + 10,
            calificacion: calificacion || Math.random() * 100,
            estado: estado || 'cursando',
            matricula_alumno,
            numeroserie_curso
        });

        res.status(201).json(newInscripcion);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Obtener inscripciones de un alumno específico
export const obtenerInscripciones = async (req, res) => {
    try {
        const { matricula } = req.params;

        const inscripciones = await Inscripciones.findAll({
            where: { matricula_alumno: matricula },
            include: [
                {
                    model: Curso,
                    attributes: ['numeroSerie', 'claveMateria', 'nombreMateria', 'creditos', 'tipo', 'Departamento'],
                },
                {
                    model: Alumno,
                    attributes: ['nombre', 'matricula', 'apellido_paterno', 'apellido_materno', 'semestres_cursados', 'creditos_totales', 'estado'],
                },
            ],
        });

        if (inscripciones.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontraron inscripciones para el alumno con matrícula ${matricula}`,
            });
        }

        res.json({ success: true, inscripciones });
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener las inscripciones",
            error: error.message,
        });
    }
};

// Actualizar una inscripción existente
export const updateInscripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_inscripcion, oportunidad, calificacion, estado, matricula_alumno } = req.body;

        const inscripcion = await Inscripciones.findByPk(id);

        if (!inscripcion) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }

        inscripcion.fecha_inscripcion = fecha_inscripcion || inscripcion.fecha_inscripcion;
        inscripcion.oportunidad = oportunidad || inscripcion.oportunidad;
        inscripcion.calificacion = calificacion || inscripcion.calificacion;
        inscripcion.estado = estado || inscripcion.estado;
        inscripcion.matricula_alumno = matricula_alumno || inscripcion.matricula_alumno;

        await inscripcion.save();

        res.status(200).json(inscripcion);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una inscripción
export const deleteInscripcion = async (req, res) => {
    try {
        const { id } = req.params;

        const inscripcion = await Inscripciones.findByPk(id);

        if (!inscripcion) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }

        await inscripcion.destroy();

        res.status(200).json({ message: 'Inscripción eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
