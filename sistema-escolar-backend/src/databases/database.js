import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sistema_escolar', 'god', 'firstday', {
    host: 'localhost', // Cambia si tu base de datos no está en localhost
    dialect: 'mysql',
    port: 3306, // Puerto por defecto de MySQL
    logging: false, // Desactiva el log de consultas SQL en la consola
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

testConnection(); // Llamada para verificar la conexión al iniciar

export default sequelize;
