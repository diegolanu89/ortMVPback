// models/Alumno.js
const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  catedra: { type: String, required: true },
  horas: { type: Number, required: true },
});

module.exports = mongoose.model('Cursos', CursoSchema);
