import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Asignaciones from './asignaciones.js';
const Maestro = sequelize.define('Maestro', {
    no_empleado: {
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    grado: {
        type: DataTypes.STRING,
        allowNull: false,

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

Maestro.hasMany(Asignaciones, 
    { foreignKey: 'no_empleado_maestro',
        sourceKey: 'no_empleado' 

    });

Asignaciones.belongsTo(Maestro, 
    { 
    foreignKey: 'no_empleado_maestro',
    targetKey: 'no_empleado'
 });

export default Maestro;
