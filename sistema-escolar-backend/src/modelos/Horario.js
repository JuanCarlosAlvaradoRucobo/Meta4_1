import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Asignaciones from './asignaciones.js';
const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        Auto_increment: true
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hora_inicio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hora_fin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aula: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    periodo_academico: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
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

Horario.hasMany(Asignaciones, { foreignKey: 'horario_id', sourceKey: 'id' });

Asignaciones.belongsTo(Horario, { foreignKey: 'horario_id', targetKey: 'id' });

export default Horario;
