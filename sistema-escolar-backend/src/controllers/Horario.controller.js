import Horario from '../modelos/Horario.js';

export const getHorarios = async (req, res) => {
    try {
        const horarios = await Horario.findAll();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHorario = async (req, res) => {
    try {
        const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
        const aulas = ['A101', 'B202', 'C303', 'D404', 'E505'];
        const newHorario = await Horario.create({
            dia: dias[Math.floor(Math.random() * dias.length)],
            hora_inicio: `${Math.floor(Math.random() * 12 + 7)}:00`,
            hora_fin: `${Math.floor(Math.random() * 12 + 8)}:00`,
            aula: aulas[Math.floor(Math.random() * aulas.length)],
            periodo_academico: `2023-${Math.floor(Math.random() * 2 + 1)}`,
            estado: Math.random() > 0.5 ? 'activo' : 'inactivo'
        });
        res.status(201).json(newHorario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};