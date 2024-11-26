import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './databases/database.js';
import VerificacionToken from '../VerificacionToken.js';
import cors from 'cors';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://accounts.google.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Origin', 
    'X-Requested-With',
    'Accept'
  ],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com";
const PORT = process.env.PORT || 3001;

async function main() {
  try {
    await VerificacionToken(GOOGLE_CLIENT_ID);
    console.log('Verificación de token establecida correctamente.');

    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada.');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error.message);
    process.exit(1); // Salir si hay errores críticos
  }
}

main();
