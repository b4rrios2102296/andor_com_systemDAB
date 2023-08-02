const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('usuarios', {
  idusuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privilegio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  hooks: {
    // Hook que se ejecutará antes de crear un nuevo registro en la base de datos
    beforeCreate: (usuario) => {
      // Genera el hash de la contraseña
      const hashedContraseña = bcrypt.hashSync(usuario.contraseña, 5); // 10 es el número de rondas de encriptación
      // Asigna el hash al campo de contraseña
      usuario.contraseña = hashedContraseña;
    },
  },
});

module.exports = Usuario;


