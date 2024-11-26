import {Router} from 'express';
import { getAlumno } from '../controllers/Alumnos.controller.js';
import { createAlumno } from '../controllers/Alumnos.controller.js';    
import { updateAlumno } from '../controllers/Alumnos.controller.js';
import { deleteAlumno } from '../controllers/Alumnos.controller.js';
import { getAlumnoByMatricula } from '../controllers/Alumnos.controller.js';   
const router = Router()
router.get('/alumnos', getAlumno);
router.post('/alumnos', createAlumno);
router.put('/alumnos/:matricula', updateAlumno);
router.delete('/alumnos/:matricula', deleteAlumno);
router.get('/alumnos/:matricula', getAlumnoByMatricula);

export default router