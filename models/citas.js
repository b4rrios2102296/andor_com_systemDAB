const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Paciente = require('./paciente');
const Doctor = require('./doctor');

const Cita = sequelize.define('citas', {
  idcitas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechacitas: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cita',
  timestamps: false
});

// Establecer la relación muchos a uno entre Paciente y Cita
Cita.belongsTo(Paciente, {
  foreignKey: 'pacientes_idpacientes',
});

// Establecer la relación muchos a uno entre Doctor y Cita
Cita.belongsTo(Doctor, {
  foreignKey: 'doctores_doctorId',
});

module.exports = Cita;
