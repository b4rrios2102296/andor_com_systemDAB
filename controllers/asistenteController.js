const jwt = require('jsonwebtoken');
const Asistente = require('../models/asistente');

const asistentesController = {
  // Crear un nuevo asistente
  crearAsistente: async (req, res) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticación inválido.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      // Verificar y decodificar el token para obtener la información de usuario
      const decodedToken = jwt.verify(token, 'sistema');
      const { id: idUsuario, privilegio } = decodedToken;

      // Verificar que el usuario tenga el privilegio de "asistente"
      if (privilegio !== 'asistente') {
        return res.status(403).json({ error: 'No tienes permiso para crear un nuevo asistente.' });
      }

      // Si el usuario es un asistente, proceder a crear el registro en la tabla de asistentes
      const { nombreAsistente, doctores_doctorId } = req.body;
      const nuevoAsistente = await Asistente.create({
        nombreAsistente,
        doctores_doctorId,
        usuarios_idusuarios1: idUsuario, // Usar la ID de usuario como la llave foránea
      });

      res.status(201).json(nuevoAsistente);
    } catch (error) {
      res.status(500).json({ error: 'Error en la creación del asistente.' });
    }
  },

  // Obtener todos los asistentes
  obtenerAsistentes: async (req, res) => {
    try {
      const asistentes = await Asistente.findAll();
      res.json(asistentes);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la lista de asistentes.' });
    }
  },

  // Obtener información de un asistente específico
  obtenerAsistente: async (req, res) => {
    const asistenteId = req.params.id;
    try {
      const asistente = await Asistente.findByPk(asistenteId);
      if (asistente) {
        res.json(asistente);
      } else {
        res.status(404).json({ error: 'Asistente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información del asistente.' });
    }
  },

  // Actualizar información de un asistente específico
  actualizarAsistente: async (req, res) => {
    const asistenteId = req.params.id;
    try {
      const [updatedRows] = await Asistente.update(req.body, {
        where: { idasistentes: asistenteId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Asistente actualizado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Asistente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la información del asistente.' });
    }
  },

  // Eliminar un asistente específico
  eliminarAsistente: async (req, res) => {
    const asistenteId = req.params.id;
    try {
      const deletedRows = await Asistente.destroy({
        where: { idasistentes: asistenteId },
      });
      if (deletedRows > 0) {
        res.json({ message: 'Asistente eliminado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Asistente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el asistente.' });
    }
  },
};

module.exports = asistentesController;
