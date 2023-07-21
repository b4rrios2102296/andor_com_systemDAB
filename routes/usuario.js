const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.obtenerUsuarios);

//ruta para actualizar
router.put('/:id', usuariosController.actualizarUsuario);

//ruta para eliminar
router.delete('/:id', usuariosController.eliminarUsuario);

// Ruta para obtener un usuario específico
router.get('/:id', usuariosController.obtenerUsuario);

//ruta de login
router.post('/login', authController.login);


module.exports = router;
