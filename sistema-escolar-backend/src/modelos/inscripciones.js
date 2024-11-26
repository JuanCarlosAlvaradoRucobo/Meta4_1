import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos

const Inscripciones = sequelize.define('Inscripciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fecha_inscripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oportunidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 40,
        validate: {
            min: 10
        }
    },
    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            min: 0.00,
            max: 100.00
        }
    },
    estado: {
        type: DataTypes.ENUM('cursando', 'reprobado', 'aprobado'),
        defaultValue: 'cursando',
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});



export default Inscripciones;