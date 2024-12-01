import { DataTypes } from 'sequelize';
import sequelize from '../databases/database.js';

// Importación de modelos
import Alumno from './Alumnos.js';
import Curso from './Curso.js';
import Inscripciones from './inscripciones.js';
import Asignaciones from './asignaciones.js';
import Maestro from './Maestro.js';
import Horario from './Horario.js';

// Relación entre Alumno e Inscripciones
Alumno.hasMany(Inscripciones, { foreignKey: 'matricula_alumno' });
Inscripciones.belongsTo(Alumno, { foreignKey: 'matricula_alumno' });

// Relación entre Curso e Inscripciones
Curso.hasMany(Inscripciones, { foreignKey: 'numeroserie_curso' });
Inscripciones.belongsTo(Curso, { foreignKey: 'numeroserie_curso' });

// Relación entre Curso y Asignaciones
Curso.hasMany(Asignaciones, { foreignKey: 'numeroserie_curso' });
Asignaciones.belongsTo(Curso, { foreignKey: 'numeroserie_curso' });

// Relación entre Asignaciones y Maestro
Asignaciones.belongsTo(Maestro, { foreignKey: 'no_empleado_maestro' });
Maestro.hasOne(Asignaciones, { foreignKey: 'no_empleado_maestro' });

// Relación entre Asignaciones y Horario
Asignaciones.belongsTo(Horario, { foreignKey: 'horario_id' });
Horario.hasOne(Asignaciones, { foreignKey: 'horario_id' });

// Exportación de modelos
export {
    sequelize,
    Alumno,
    Curso,
    Inscripciones,
    Asignaciones,
    Maestro,
    Horario,
};
