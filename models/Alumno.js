// models/Alumno.js
const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', unique: true } 
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
