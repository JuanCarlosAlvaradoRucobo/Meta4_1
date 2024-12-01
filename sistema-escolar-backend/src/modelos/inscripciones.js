import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js';
import Curso from '../modelos/Curso.js'; // Asegúrate de importar Curso
import Alumno from '../modelos/Alumnos.js';

const Inscripciones = sequelize.define('Inscripciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,  // Cambiado a DATE en lugar de STRING
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    oportunidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 3
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
    },
    matricula_alumno: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Alumnos',
            key: 'matricula'
        }
    },
    numeroserie_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Curso',
            key: 'numeroSerie'
        }
    },
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});

export default Inscripciones;
