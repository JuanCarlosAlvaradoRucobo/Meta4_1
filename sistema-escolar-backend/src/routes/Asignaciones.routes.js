import express from 'express';
import {
  getAsignaciones,
  createAsignacion,
  getAsignacionById,
  updateAsignacion,
  deleteAsignacion
} from '../controllers/Asignaciones.controller.js';

const router = express.Router();

// Ruta para obtener todas las asignaciones
router.get('/asignaciones', getAsignaciones);

// Ruta para crear una nueva asignación
router.post('/asignaciones', createAsignacion);

// Ruta para obtener una asignación por su ID
router.get('/asignaciones/:id', getAsignacionById);

// Ruta para actualizar una asignación
router.put('/asignaciones/:id', updateAsignacion);

// Ruta para eliminar una asignación
router.delete('asignaciones/:id', deleteAsignacion);

export default router;
