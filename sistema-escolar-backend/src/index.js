import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './databases/database.js';
import VerificacionToken from './VerificacionToken.js';
import cors from 'cors';

//dotenv.config();

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000/', // Permitir solo este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

const GOOGLE_CLIENT_ID = "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com";
const PORT = 3001;

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