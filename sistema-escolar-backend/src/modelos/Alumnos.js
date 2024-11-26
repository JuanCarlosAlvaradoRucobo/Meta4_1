import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Inscripciones from './inscripciones.js';

export const Alumno = sequelize.define('Alumno', {
    matricula: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 10]
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    semestres_cursados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    creditos_totales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo',
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});


Alumno.hasMany(Inscripciones, {
    foreignKey: 'matricula_alumno',
    sourceKey: 'matricula'
});

Inscripciones.belongsTo(Alumno, {
    foreignKey: 'matricula_alumno',
    targetKey: 'matricula'
});

