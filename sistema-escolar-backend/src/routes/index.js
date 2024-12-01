import express from 'express';
const router = express.Router();

import estudianteRoutes from './Alumnos.routes.js';
import cursoRoutes from './Curso.routes.js';
import maestroRoutes from './Maestro.routes.js';
import horarioRoutes from './Horario.routes.js';
import asignacionesRoutes from './Asignaciones.routes.js';
import inscripcionesRoutes from './Inscripciones.routes.js';
import authRoutes from './auth.routes.js';

router.use('/auth', authRoutes);
router.use('/', estudianteRoutes);
router.use('/', cursoRoutes);
router.use('/', maestroRoutes);
router.use('/', horarioRoutes);
router.use('/', asignacionesRoutes);
router.use('/', inscripcionesRoutes);

export default router;