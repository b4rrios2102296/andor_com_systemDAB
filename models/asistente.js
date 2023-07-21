const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Usuario = require('./usuario');
const Doctor = require('./doctor');

class Asistente extends Model {}

Asistente.init({
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
