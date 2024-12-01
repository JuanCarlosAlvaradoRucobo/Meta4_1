import Joi from 'joi';
import { Alumno } from '../modelos/Alumnos.js'; // Asegúrate de importar correctamente tu modelo

// Esquema de validación con Joi
const alumnoSchema = Joi.object({
    matricula: Joi.string().required(),
    nombre: Joi.string().required(),
    apellidoPaterno: Joi.string().required(),
    apellidoMaterno: Joi.string().allow(null, ''),
    semestresCursados: Joi.number().integer().min(0).required(),
    creditos: Joi.number().integer().min(0).required(),
    estado: Joi.string().valid('Activo', 'Inactivo').required(),
});

export const getAlumno = async (req, res) => {
    try {
        const alumnos = await Alumno.findAll();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createAlumno = async (req, res) => {
    try {
        const {
            matricula,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            semestresCursados,
            creditos,
            estado
        } = req.body;

        // Crear el nuevo curso con los datos proporcionados
        const newAlumno = await Alumno.create({
            matricula,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            semestresCursados,
            creditos,
            estado
        });

        res.status(201).json(newAlumno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAlumno = async (req, res) => {
    const { matricula } = req.params;
  const data = req.body;
  try {
    const result = await Alumno.update(data, { where: { matricula } });
    if (result[0] === 0) {
      return res.status(404).send({ message: 'Alumno no encontrado.' });
    }
    res.status(200).send({ message: 'Alumno actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
    res.status(500).send({ message: 'Error al actualizar el alumno.' });
  }
};

export const deleteAlumno = async (req, res) => {
    const { matricula } = req.params;
  try {
    await Alumno.destroy({ where: { matricula } });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    res.status(500).send({ message: 'Error al eliminar el alumno.' });
  }
};


export const getAlumnoByMatricula = async (req, res) => {
    try {
        const { matricula } = req.query;

        // Verifica si la matrícula fue proporcionada
        if (!matricula) {
            return res.status(400).json({ message: 'El parámetro "matricula" es requerido en la consulta.' });
        }

        // Busca el alumno por matrícula
        const alumno = await Alumno.findOne({ where: { matricula } });

        // Verifica si el alumno fue encontrado
        if (!alumno) {
            return res.status(404).json({ message: `Alumno con matrícula ${matricula} no encontrado.` });
        }

        res.json(alumno);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener el alumno: ${error.message}` });
    }
};