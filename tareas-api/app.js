// tareas-api/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const proyectoRoutes = require('./routes/proyecto');
require('dotenv').config();
require('./config/database'); // Configura la conexión a la base de datos

app.use(cors()); // Habilita CORS

app.use(express.json());

app.use('/api/proyectos', proyectoRoutes);

module.exports = app;
