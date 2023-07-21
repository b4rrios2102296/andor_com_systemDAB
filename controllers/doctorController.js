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
};

module.exports = doctoresController;
