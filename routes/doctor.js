const express = require('express');
const router = express.Router();
const doctoresController = require('../controllers/doctorController');

// Ruta para crear un nuevo doctor
router.post('/', doctoresController.crearDoctor);

// Ruta para obtener la lista de doctores
router.get('/', doctoresController.obtenerDoctores);

// Ruta para obtener la información de un doctor específico
router.get('/:id', doctoresController.obtenerDoctor);

// Ruta para actualizar la información de un doctor específico
router.put('/:id', doctoresController.actualizarDoctor);

// Ruta para eliminar un doctor específico
router.delete('/:id', doctoresController.eliminarDoctor);

module.exports = router;