const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); // Importa el controlador correctamente

// Ruta para el login
router.post('/login', authController.login);

// Ruta para el registro
router.post('/register', authController.register); // Asegúrate de que authController.register esté definido

module.exports = router;
