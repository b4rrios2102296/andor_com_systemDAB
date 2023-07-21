const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Usuario = require('./usuariomodel');

const Doctor = sequelize.define('doctores', {
  doctorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreDoctor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedulaprofesional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Doctor',
  timestamps: false
});

// Establecer la relación uno a uno entre Doctor y Usuario
Doctor.belongsTo(Usuario, {
  foreignKey: 'usuarios_idusuarios',
});

module.exports = Doctor;
