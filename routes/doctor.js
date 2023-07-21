const express = require('express');
const router = express.Router();
const doctoresController = require('../controllers/doctorController');

// Ruta para crear un nuevo doctor
router.post('/', doctoresController.crearDoctor);

module.exports = router;