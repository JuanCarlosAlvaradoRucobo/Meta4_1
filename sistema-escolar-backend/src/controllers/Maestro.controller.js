import Maestro from '../modelos/Maestro.js';

export const getMaestros = async (req, res) => {
    try {
        const maestros = await Maestro.findAll();
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createMaestro = async (req, res) => {
    console.log(req.body); // Log de datos recibidos
    try {
        const newMaestro = await Maestro.create(req.body);
        res.status(201).json(newMaestro);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};


export const getMaestro = async (req, res) => {
    try {
        const { no_empleado } = req.params;
        const maestro = await Maestro.findOne({ where: { no_empleado } });
        if (!maestro) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }
        res.json(maestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un maestro por su número de empleado
export const updateMaestro = async (req, res) => {
    try {
        const { no_empleado } = req.params;
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            grado,
            estado
        } = req.body;

        const updatedMaestro = await Maestro.update({
            nombre,
            apellido_paterno,
            apellido_materno,
            grado,
            estado
        }, {
            where: { no_empleado }
        });

        if (updatedMaestro[0] === 0) { // Sequelize devuelve un array, donde el primer elemento es el número de registros actualizados
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }

        res.json({ message: 'Maestro actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un maestro por su número de empleado
export const deleteMaestro = async (req, res) => {
    try {
        const { no_empleado } = req.params;
        const deletedMaestro = await Maestro.destroy({ where: { no_empleado } });

        if (deletedMaestro === 0) {
            return res.status(404).json({ message: 'Maestro no encontrado' });
        }

        res.json({ message: 'Maestro eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};