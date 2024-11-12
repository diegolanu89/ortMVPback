// routes/alumno.js
const express = require('express');
const Alumno = require('../models/Alumno');
const router = express.Router();

// Ruta para obtener la lista de alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos.' });
  }
});

module.exports = router;
