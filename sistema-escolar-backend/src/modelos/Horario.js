import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Asignaciones from './asignaciones.js'; // Asegúrate de que la ruta sea correcta
import Curso from './Curso.js'; // Asegúrate de que la ruta sea correcta
const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'),
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    aula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroserie_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Curso',
            key: 'numeroSerie'
        }
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});

export default Horario;
