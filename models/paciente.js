const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Usuario = require('./usuario');
const Doctor = require('./doctor');

class Paciente extends Model {}

Paciente.init({
  idpacientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombrepacientes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RFCpaciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.BLOB, // Solo como ejemplo, puedes ajustar el tipo de datos según tus necesidades
    allowNull: true,
  },
  alergias: {
    type: DataTypes.BLOB, // Solo como ejemplo, puedes ajustar el tipo de datos según tus necesidades
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Paciente',
});

// Establecer la relación uno a muchos entre Doctor y Paciente
Doctor.hasMany(Paciente, {
  foreignKey: 'doctores_doctorId',
});

// Establecer la relación uno a uno entre Paciente y Usuario
Paciente.belongsTo(Usuario, {
  foreignKey: 'usuarios_idusuarios',
});

module.exports = Paciente;
