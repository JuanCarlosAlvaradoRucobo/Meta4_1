import express from 'express';  
import { getMaestros } from '../controllers/Maestro.controller.js';
import { createMaestro } from '../controllers/Maestro.controller.js';  
import { updateMaestro } from '../controllers/Maestro.controller.js';
import { deleteMaestro } from '../controllers/Maestro.controller.js';
import { getMaestro } from '../controllers/Maestro.controller.js';     
const router = express.Router()
router.get('/maestros', getMaestros);
router.post('/maestros', createMaestro);
router.put('/maestros/:no_empleado', updateMaestro);
router.delete('/maestros/:no_empleado', deleteMaestro);
router.get('/maestros/:no_empleado', getMaestro);

export default router 