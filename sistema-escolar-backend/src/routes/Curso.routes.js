import express from 'express';
import { getCursos } from '../controllers/Curso.controller.js';
import { createCurso } from '../controllers/Curso.controller.js'; 
import { updateCurso } from '../controllers/Curso.controller.js';
import { deleteCurso } from '../controllers/Curso.controller.js';
import { getCursoByNumeroSerie } from '../controllers/Curso.controller.js';      

const router = express.Router();
router.get('/cursos', getCursos);
router.post('/cursos', createCurso);
router.put('/cursos/:numeroSerie', updateCurso);
router.delete('/cursos/:numeroSerie', deleteCurso);
router.get('/cursos/:numeroSerie', getCursoByNumeroSerie);

export default router;