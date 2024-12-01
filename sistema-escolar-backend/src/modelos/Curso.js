import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Maestro from '../modelos/Maestro.js'; // Asegúrate de importar Maestro
import Horario from '../modelos/Horario.js'; // Asegúrate de importar Horario
import Inscripciones from '../modelos/inscripciones.js';
import Asignaciones from '../modelos/asignaciones.js';

const Curso = sequelize.define('Curso', {
    numeroSerie: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    claveMateria: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombreMateria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    tipo: {
        type: DataTypes.ENUM('obligatorio', 'optativo'),
        defaultValue: 'obligatorio',
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});

export default Curso;