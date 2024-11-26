import Inscripciones from '../modelos/inscripciones.js';

export const getInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripciones.findAll();
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createInscripcion = async (req, res) => {
    try {
        const newInscripcion = await Inscripciones.create({
            id: Math.floor(Math.random() * 1000),
            fecha_inscripcion: new Date().toISOString(),
            oportunidad: Math.floor(Math.random() * 30) + 10,
            calificacion: Math.random() * 100,
            estado: ['cursando', 'reprobado', 'aprobado'][Math.floor(Math.random() * 3)]
        });
        res.status(201).json(newInscripcion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};