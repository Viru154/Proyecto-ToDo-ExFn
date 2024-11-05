// tareas-api/routes/proyecto.js
const express = require('express');
const router = express.Router();
const Proyecto = require('../models/proyecto');

// Crear proyecto
router.post('/', async (req, res) => {
    try {
        const proyecto = await Proyecto.create(req.body);
        res.status(201).json(proyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer todos los proyectos
router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer proyecto por ID
router.get('/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (proyecto) res.json(proyecto);
        else res.status(404).json({ error: 'Proyecto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar proyecto
router.put('/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (proyecto) {
            await proyecto.update(req.body);
            res.json(proyecto);
        } else res.status(404).json({ error: 'Proyecto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar proyecto
router.delete('/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (proyecto) {
            await proyecto.destroy();
            res.json({ message: 'Proyecto eliminado' });
        } else res.status(404).json({ error: 'Proyecto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
