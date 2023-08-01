const jwt = require('jsonwebtoken');
const Cita = require('../models/citas');
const Paciente = require('../models/paciente');
const Doctor = require('../models/doctor');

const citasController = {
    // Crear una nueva cita
    crearCita: async (req, res) => {
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
    
          let pacientes_idpacientes;
          let doctores_doctorId;
    
          // Si el usuario es un paciente, obtener las id de pacientes y doctores mediante consulta
          if (privilegio === 'paciente') {
            const paciente = await Paciente.findOne({
              where: { usuarios_idusuarios: idUsuario },
              attributes: ['idpacientes', 'doctores_doctorId'],
            });
    
            if (!paciente) {
              return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
    
            pacientes_idpacientes = paciente.idpacientes;
            doctores_doctorId = paciente.doctores_doctorId;
          }
    
          // Si el usuario es un doctor, obtener la id de doctores mediante consulta
          if (privilegio === 'doctor') {
            const doctor = await Doctor.findOne({
              where: { usuarios_idusuarios: idUsuario },
              attributes: ['doctorId'],
            });
    
            if (!doctor) {
              return res.status(404).json({ error: 'Doctor no encontrado.' });
            }
    
            doctores_doctorId = doctor.doctorId;
          }
    
          const { fechacitas, status } = req.body;
    
          const nuevaCita = await Cita.create({
            fechacitas,
            status,
            pacientes_idpacientes,
            doctores_doctorId,
          });
    
          res.status(201).json(nuevaCita);
        } catch (error) {
          res.status(500).json({ error: 'Error en la creación de la cita.' });
        }
    },


  // Obtener todas las citas
  obtenerCitas: async (req, res) => {
    try {
      const citas = await Cita.findAll();
      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la lista de citas.' });
    }
  },

  // Obtener información de una cita específica
  obtenerCita: async (req, res) => {
    const citaId = req.params.id;
    try {
      const cita = await Cita.findByPk(citaId);
      if (cita) {
        res.json(cita);
      } else {
        res.status(404).json({ error: 'Cita no encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información de la cita.' });
    }
  },

  // Actualizar información de una cita específica
  actualizarCita: async (req, res) => {
    const citaId = req.params.id;
    try {
      const [updatedRows] = await Cita.update(req.body, {
        where: { idcitas: citaId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Cita actualizada exitosamente.' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la información de la cita.' });
    }
  },

  // Eliminar una cita específica
  eliminarCita: async (req, res) => {
    const citaId = req.params.id;
    try {
      const deletedRows = await Cita.destroy({
        where: { idcitas: citaId },
      });
      if (deletedRows > 0) {
        res.json({ message: 'Cita eliminada exitosamente.' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar la cita.' });
    }
  },
};

module.exports = citasController;
