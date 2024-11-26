import Curso from '../modelos/Curso.js';

export const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        console.log('Cursos encontrados:', cursos); // Verifica lo que devuelve la base de datos
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createCurso = async (req, res) => {
    try {
        const {
            numeroSerie,
            claveMateria,
            nombreMateria,
            creditos,
            tipo,
            Departamento
        } = req.body;

        // Crear el nuevo curso con los datos proporcionados
        const newCurso = await Curso.create({
            numeroSerie,
            claveMateria,
            nombreMateria,
            creditos,
            tipo,
            Departamento
        });

        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCurso = async (req, res) => {
    try {
        const { numeroSerie } = req.params;
        const {
            claveMateria,
            nombreMateria,
            creditos,
            tipo,
            Departamento
        } = req.body;

        const updatedCurso = await Curso.update({
            claveMateria,
            nombreMateria,
            creditos,
            tipo,
            Departamento
        }, {
            where: { numeroSerie }
        });

        if (updatedCurso[0] === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        res.json({ message: 'Curso actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCurso = async (req, res) => {
    try {
        const { numeroSerie } = req.params;
        const deletedCurso = await Curso.destroy({ where: { numeroSerie } });

        if (deletedCurso === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getCursoByNumeroSerie = async (req, res) => {    
    try {
        const { numeroSerie } = req.params;
        const curso = await Curso.findOne({ where: { numeroSerie } });
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};