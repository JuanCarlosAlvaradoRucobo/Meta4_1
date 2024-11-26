import Asignaciones from '../modelos/asignaciones.js';

export const getAsignaciones = async (req, res) => {
    try {
        const asignaciones = await Asignaciones.findAll();
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAsignacion = async (req, res) => {
    try {
        const newAsignacion = await Asignaciones.create({
            id: Math.floor(Math.random() * 1000),
            fecha_inicio: new Date(),
            fecha_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            estado: Math.random() > 0.5 ? 'activo' : 'inactivo'
        });
        res.status(201).json(newAsignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};