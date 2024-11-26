import express from 'express';
import cors from 'cors';
import estudianteRoutes from '../routes/Alumnos.routes.js';
import cursoRoutes from '../routes/Curso.routes.js';
import maestroRoutes from '../routes/Maestro.routes.js';
import horarioRoutes from '../routes/Horario.routes.js';
import asignacionesRoutes from '../routes/Asignaciones.routes.js';
import inscripcionesRoutes from '../routes/Inscripciones.routes.js';

const app = express();

// Habilitar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(express.json());

// Usar las rutas importadas
app.use('/', estudianteRoutes);
app.use('/', cursoRoutes);
app.use('/', maestroRoutes);
app.use('/', horarioRoutes);
app.use('/', asignacionesRoutes);
app.use('/', inscripcionesRoutes);

// Ruta de autenticación (como en tu código original)
app.post('/auth/google', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const verificador = await VerificacionToken(GOOGLE_CLIENT_ID);
    const resultado = await verificador.verify(token);

    if (!resultado.success) {
      return res.status(401).json(resultado);
    }

    res.json({
      success: true,
      user: resultado.payload
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación',
      error: error.message
    });
  }
});

// Ruta de estado para verificar que el servidor está funcionando
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

export default app;
