const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Crear una nueva cita
router.post('/', citasController.crearCita);

// Obtener todas las citas
router.get('/', citasController.obtenerCitas);

// Obtener información de una cita específica
router.get('/:id', citasController.obtenerCita);

// Actualizar información de una cita específica
router.put('/:id', citasController.actualizarCita);

// Eliminar una cita específica
router.delete('/:id', citasController.eliminarCita);

module.exports = router;