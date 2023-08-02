const Usuario = require('../models/usuariomodel');

const usuariosController = {
  // Obtener todos los usuarios
  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la lista de usuarios.' });
    }
  },

  // Crear un nuevo usuario
    crearUsuario: async (req, res) => {
      const { nombreUsuario, contraseña, privilegio, correo } = req.body;
      try {
        //metodo para comprobar si ya hay otro user
        const existingUser = await Usuario.findOne({ where: { nombreUsuario } });
        if (existingUser) {
          return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }
        const users = await Usuario.create({ nombreUsuario, contraseña, privilegio, correo });
        res.status(201).json(users);
      } catch (err) {
        console.log(err);
        console.log('Error posting users');
        res.status(500).json({ message: 'Error in posting users' });
      }
    },
    

  // Obtener información de un usuario específico
  obtenerUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuario = await Usuario.findByPk(usuarioId);
      if (usuario) {
        // Elimina la contraseña del objeto antes de enviarlo en la respuesta
        usuario.contraseña = undefined;
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información del usuario.' });
    }
  },

  // Actualizar información de un usuario específico
  actualizarUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      // Elimina la contraseña del cuerpo de la solicitud antes de actualizar el usuario
      delete req.body.contraseña;
      const [updatedRows] = await Usuario.update(req.body, {
        where: { idusuarios: usuarioId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Usuario actualizado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la información del usuario.' });
    }
  },

  // Eliminar un usuario específico
  eliminarUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const deletedRows = await Usuario.destroy({
        where: { idusuarios: usuarioId },
      });
      if (deletedRows > 0) {
        res.json({ message: 'Usuario eliminado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el usuario.' });
    }
  },
};

module.exports = usuariosController;
