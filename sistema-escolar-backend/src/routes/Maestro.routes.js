import express from 'express';  
import { getMaestros, createMaestro, getMaestro, updateMaestro, deleteMaestro } from '../controllers/Maestro.controller.js';

const router = express.Router();

router.get('/maestros', getMaestros);
router.post('/maestros', createMaestro);
router.get('/maestros/:no_empleado', getMaestro);
router.put('/maestros/:no_empleado', updateMaestro);
router.delete('/maestros/:no_empleado', deleteMaestro);

export default router;