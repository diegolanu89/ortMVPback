// models/Progreso.js
const mongoose = require('mongoose');

const ProgresoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referencia al usuario
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true }, // Referencia al curso
  porcentajeCompletado: { type: Number, default: 0 }, // Porcentaje completado del curso
  fechaInicio: { type: Date, default: Date.now }, // Fecha de inicio del progreso
  fechaUltimaActualizacion: { type: Date, default: Date.now } // Última fecha de actualización del progreso
});

module.exports = mongoose.model('Progreso', ProgresoSchema);
