import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Maestro from '../modelos/Maestro.js'; // Asegúrate de importar Maestro
import Curso from '../modelos/Curso.js';

const Asignaciones = sequelize.define('Asignaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    no_empleado_maestro: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Maestro',
            key: 'no_empleado'
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
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
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

export default Asignaciones;