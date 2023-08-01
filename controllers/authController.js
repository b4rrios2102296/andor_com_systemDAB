const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuariomodel');

const authController = {
  // Inicio de sesión
  login: async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;
    try {
      // Buscar el usuario en la base de datos por nombre de usuario
      const usuario = await Usuario.findOne({ where: { nombreUsuario } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      // Verificar la contraseña encriptada
      const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }

      // Crear un token de autenticación
      const token = jwt.sign({ id: usuario.idusuarios, privilegio: usuario.privilegio }, 'sistema', { expiresIn: '1h' });
      console.log(token);
      const response = { ok: true, message: 'Inicio de sesión exitoso', usuario, token };
          return res.status(200).json(response);
          
    } catch (error) {
      res.status(500).json({ error: 'Error en el inicio de sesión.' });
    }
  },
};

module.exports = authController;

