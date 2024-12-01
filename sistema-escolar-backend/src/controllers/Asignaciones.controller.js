import Asignaciones from '../modelos/asignaciones.js';

// Obtener todas las asignaciones
export const getAsignaciones = async (req, res) => {
    try {
        const asignaciones = await Asignaciones.findAll();
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva asignación
export const createAsignacion = async (req, res) => {
    try {
        const newAsignacion = await Asignaciones.create({
            id: Math.floor(Math.random() * 1000),
            fecha_inicio: new Date(),
            fecha_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            estado: req.body.estado || 'activo'
        });
        res.status(201).json(newAsignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una asignación por su ID
export const getAsignacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const asignacion = await Asignaciones.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada' });
        }
        res.json(asignacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una asignación
export const updateAsignacion = async (req, res) => {
    const { id } = req.params;
    try {
        const asignacion = await Asignaciones.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada' });
        }
        const updatedAsignacion = await asignacion.update(req.body);
        res.json(updatedAsignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una asignación
export const deleteAsignacion = async (req, res) => {
    const { id } = req.params;
    try {
        const asignacion = await Asignaciones.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada' });
        }
        await asignacion.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
