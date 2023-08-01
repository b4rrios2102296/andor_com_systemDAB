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
};

module.exports = pacientesController;
