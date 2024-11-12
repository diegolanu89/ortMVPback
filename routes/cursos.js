// routes/cursos.js
const express = require('express');
const Cursos = require('../models/Cursos');
const router = express.Router();


// Ruta para obtener la lista de cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Cursos.find(); // Obtiene todos los cursos
    res.status(200).json(cursos); // Envía los cursos como respuesta en JSON
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    res.status(500).json({ message: 'Error al obtener los cursos.' });
  }
});


// Ruta para crear un nuevo curso
router.post('/', async (req, res) => {

  const curso = new Curso({
    nombre: req.body.nombre,
    catedra: req.body.catedra,
    horas: req.body.horas
  });

  try {
    const nuevoCurso = await curso.save();
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
