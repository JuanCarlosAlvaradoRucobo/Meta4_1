import express from 'express';
import {
    getInscripciones,
    createInscripcion,
    obtenerInscripciones,
    updateInscripcion,
    deleteInscripcion
} from '../controllers/Inscripciones.controller.js';

const router = express.Router();

router.get('/inscripciones', getInscripciones); // Obtener todas las inscripciones
router.post('/inscripciones', createInscripcion); // Crear una nueva inscripción
router.get('/inscripciones/:matricula', obtenerInscripciones); // Obtener inscripciones de un alumno
router.put('/inscripciones/:id', updateInscripcion); // Actualizar una inscripción
router.delete('/inscripciones/:id', deleteInscripcion); // Eliminar una inscripción
export default router;
