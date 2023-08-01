const express = require('express');
const router = express.Router();
const asistentesController = require('../controllers/asistenteController');

// Ruta para crear un nuevo asistente
router.post('/', asistentesController.crearAsistente);

// Ruta para obtener todos los asistentes
router.get('/', asistentesController.obtenerAsistentes);

// Ruta para obtener información de un asistente específico
router.get('/:id', asistentesController.obtenerAsistente);

// Ruta para actualizar información de un asistente específico
router.put('/:id', asistentesController.actualizarAsistente);

// Ruta para eliminar un asistente específico
router.delete('/:id', asistentesController.eliminarAsistente);

module.exports = router;