import express from 'express';
import cors from 'cors'; // Importar cors para manejar el problema de CORS
import routes from './routes/index.js'; // Importa las rutas desde index.js en la carpeta routes

const app = express();

// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solicitudes desde esta URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Permitir el envío de cookies y encabezados autenticados
}));

// Middleware para parsear JSON
app.use(express.json());

// Prefijo de rutas
app.use('/api', routes); // Usa las rutas en el prefijo '/api'

// Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Servidor activo', status: 'success' });
});

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Exporta el app para su uso en otros archivos si es necesario
export default app;