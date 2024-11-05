// tareas-api/app.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/database'); // Configura la conexión a la base de datos

// Importar rutas
const proyectoRoutes = require('./routes/proyecto');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita la lectura de JSON en las solicitudes

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectoRoutes);

module.exports = app;
