// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  cursos: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }
  ],
  alumno: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' },
  progresos: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Progreso' } // Referencias a documentos de progreso
  ]
});

UsuarioSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.contraseña);
};

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
