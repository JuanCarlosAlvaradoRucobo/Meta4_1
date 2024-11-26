import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js'; // Ajusta la ruta según tu estructura de archivos
import Inscripciones from './inscripciones.js';
import Asignaciones from './asignaciones.js';
const Curso = sequelize.define('Curso', {
    numeroSerie: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    claveMateria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nombreMateria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    tipo: {
        type: DataTypes.ENUM('obligatorio', 'optativo'),
        defaultValue: 'obligatorio',
        allowNull: false,

    },
    Departamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'ultima_actualizacion'
});

Curso.hasMany(Inscripciones, 
    { foreignKey: 'numeroserie_curso',
        sourceKey: 'numeroSerie' 

    });

Inscripciones.belongsTo(Curso, 
    { 
    foreignKey: 'numeroserie_curso',
    targetKey: 'numeroSerie'
 });


 Curso.hasMany(Asignaciones, 
    { foreignKey: 'numeroserie_curso',
        sourceKey: 'numeroSerie' 

    });

Asignaciones.belongsTo(Curso, 
    { 
    foreignKey: 'numeroserie_curso',
    targetKey: 'numeroSerie'
 });
export default Curso;
