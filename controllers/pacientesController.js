const jwt = require('jsonwebtoken');
const Paciente = require('../models/paciente');

const pacientesController = {
  crearPaciente: async (req, res) => {
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

      // Verificar que el usuario tenga el privilegio de "paciente"
      if (privilegio !== 'paciente') {
        return res.status(403).json({ error: 'No tienes permiso para crear un nuevo paciente.' });
      }

      // Si el usuario es un paciente, proceder a crear el registro en la tabla de pacientes
      const { nombrepacientes, doctores_doctorId, RFCpaciente, direccion, alegias } = req.body;
      const nuevoPaciente = await Paciente.create({
        nombrepacientes,
        doctores_doctorId,
        usuarios_idusuarios: idUsuario, // Usar la ID de usuario como la llave foránea
        RFCpaciente,
        direccion,
        alegias,
      });

      res.status(201).json(nuevoPaciente);
    } catch (error) {
      res.status(500).json({ error: 'Error en la creación del paciente.' });
    }
  },

  obtenerPacientes: async (req, res) => {
    try {
      const pacientes = await Paciente.findAll();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la lista de pacientes.' });
    }
  },

  // Obtener información de un paciente específico
  obtenerPaciente: async (req, res) => {
    const pacienteId = req.params.id;
    try {
      const paciente = await Paciente.findByPk(pacienteId);
      if (paciente) {
        res.json(paciente);
      } else {
        res.status(404).json({ error: 'Paciente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información del paciente.' });
    }
  },

  // Actualizar información de un paciente específico
  actualizarPaciente: async (req, res) => {
    const pacienteId = req.params.id;
    try {
      const [updatedRows] = await Paciente.update(req.body, {
        where: { pacienteId: pacienteId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Paciente actualizado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Paciente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la información del paciente.' });
    }
  },

  // Eliminar un paciente específico
  eliminarPaciente: async (req, res) => {
    const pacienteId = req.params.id;
    try {
      const deletedRows = await Paciente.destroy({
        where: { pacienteId: pacienteId },
      });
      if (deletedRows > 0) {
        res.json({ message: 'Paciente eliminado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Paciente no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el paciente.' });
    }
  },
};

module.exports = pacientesController;
