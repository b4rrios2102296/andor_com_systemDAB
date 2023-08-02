const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.post('/', pacientesController.crearPaciente);

router.get('/', pacientesController.obtenerPacientes);

router.get('/:id', pacientesController.obtenerPaciente);

router.put('/:id', pacientesController.actualizarPaciente);

router.delete('/:id', pacientesController.eliminarPaciente);

module.exports = router;