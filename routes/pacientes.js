const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.post('/', pacientesController.crearPaciente);

module.exports = router;