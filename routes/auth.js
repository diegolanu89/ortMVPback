// routes/auth.js
const express = require('express');
const Usuario = require('../models/Usuario');
const Alumno = require('../models/Alumno');
const bcrypt = require('bcrypt');
const router = express.Router();

// Ruta para registrar un nuevo usuario y crear automáticamente el alumno asociado
router.post('/register', async (req, res) => {
  const { nombre, email, contraseña, edad } = req.body;

  try {
    // Verificar si el correo ya está en uso
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, contraseña });
    await nuevoUsuario.save();

    // Crear el alumno asociado con edad
    const nuevoAlumno = new Alumno({
      nombre,
      email,
      edad,               // Agregar edad al documento de Alumno
      usuario: nuevoUsuario._id  // Asocia el usuario al alumno
    });
    await nuevoAlumno.save();

    // Asociar el alumno al usuario y guardar el usuario actualizado
    nuevoUsuario.alumno = nuevoAlumno._id;
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario y alumno creados exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario y crear alumno:', error.message);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

const jwt = require('jsonwebtoken');

//Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
     
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    // Verificar contraseña
    const esContraseñaValida = await usuario.comparePassword(contraseña);
    if (!esContraseñaValida) {
      
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    // Crear el token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
