const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

const doctoresController = {
  crearDoctor: async (req, res) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    const token = req.header('Authorization').replace('Bearer ', '');
    
    try {
      // Verificar y decodificar el token para obtener la información de usuario
      const decodedToken = jwt.verify(token, 'sistema');
      const { id: idUsuario, privilegio } = decodedToken;

      // Verificar que el usuario tenga el privilegio de "doctor"
      if (privilegio !== 'doctor') {
        return res.status(403).json({ error: 'No tienes permiso para crear un nuevo doctor.' });
      }

      // Si el usuario es un doctor, proceder a crear el registro en la tabla de doctores
      const { nombreDoctor, especialidad, cedulaprofesional } = req.body;
      const nuevoDoctor = await Doctor.create({
        nombreDoctor,
        especialidad,
        cedulaprofesional,
        usuarios_idusuarios: idUsuario, // Usar la ID de usuario como la llave foránea
      });

      res.status(201).json(nuevoDoctor);
    } catch (error) {
      res.status(500).json({ error: 'Error en la creación del doctor.' });
    }
  },

  obtenerDoctores: async (req, res) => {
    try {
      const doctores = await Doctor.findAll();
      res.json(doctores);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la lista de doctores.' });
    }
  },

  // Obtener información de un doctor específico
  obtenerDoctor: async (req, res) => {
    const doctorId = req.params.id;
    try {
      const doctor = await Doctor.findByPk(doctorId);
      if (doctor) {
        res.json(doctor);
      } else {
        res.status(404).json({ error: 'Doctor no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información del doctor.' });
    }
  },

  // Actualizar información de un doctor específico
  actualizarDoctor: async (req, res) => {
    const doctorId = req.params.id;
    try {
      const [updatedRows] = await Doctor.update(req.body, {
        where: { doctorId: doctorId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Doctor actualizado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Doctor no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la información del doctor.' });
    }
  },

  // Eliminar un doctor específico
  eliminarDoctor: async (req, res) => {
    const doctorId = req.params.id;
    try {
      const deletedRows = await Doctor.destroy({
        where: { doctorId: doctorId },
      });
      if (deletedRows > 0) {
        res.json({ message: 'Doctor eliminado exitosamente.' });
      } else {
        res.status(404).json({ error: 'Doctor no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el doctor.' });
    }
  },
};

module.exports = doctoresController;
