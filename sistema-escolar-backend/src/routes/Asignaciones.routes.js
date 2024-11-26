import {Router} from 'express';
import { getAsignaciones } from '../controllers/Asignaciones.controller.js';
import { createAsignacion } from '../controllers/Asignaciones.controller.js';       
const router = Router()
router.get('/asignaciones', getAsignaciones);
router.post('/asignaciones', createAsignacion);
router.put('/asignaciones/:id');
router.delete('/asignaciones/:id');
router.get('/asignaciones/id:');

export default router