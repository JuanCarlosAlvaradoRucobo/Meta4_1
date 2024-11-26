import express from 'express'; 
import { getInscripciones } from '../controllers/Inscripciones.controller.js';
import { createInscripcion } from '../controllers/Inscripciones.controller.js';

const router = express.Router();
router.get('/inscripciones', getInscripciones);
router.post('/inscripciones', createInscripcion);
router.put('/inscripciones/:id');
router.delete('/inscripciones/:id');
router.get('/inscripciones/:id');

export default router 
