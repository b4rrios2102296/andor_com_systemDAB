const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Usuario = require('./usuariomodel');
const Doctor = require('./doctor');

const Asistente = sequelize.define('asistentes', {
  idasistentes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreAsistente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Asistente',
  timestamps: false
});

// Establecer la relación uno a muchos entre Doctor y Asistente
Doctor.hasMany(Asistente, {
  foreignKey: 'doctores_doctorId',
});

// Establecer la relación uno a uno entre Asistente y Usuario
Asistente.belongsTo(Usuario, {
  foreignKey: 'usuarios_idusuarios1',
});

module.exports = Asistente;

