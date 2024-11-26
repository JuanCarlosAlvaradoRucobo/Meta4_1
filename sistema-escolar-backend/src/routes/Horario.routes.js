import express from 'express';
import { getHorarios } from '../controllers/Horario.controller.js';
import { createHorario } from '../controllers/Horario.controller.js';       
const router = express.Router()
router.get('/horarios', getHorarios);
router.post('/horarios', createHorario);
router.put('/horarios/:id');
router.delete('/horarios/:id');
router.get('/horarios/:id');

export default router