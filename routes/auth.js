// routes/auth.js
const express = require('express');
const Usuario = require('../models/Usuario');
const Alumno = require('../models/Alumno');
const authMiddleware = require('../middleware/auth');
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

    const token = jwt.sign({ userId: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    

   // Envía el token y el usuario en la respuesta
   res.status(201).json({ token, usuario:nuevoUsuario });
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
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

    const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaCorrecta) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token ,usuario});
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para obtener el usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await Usuario.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

module.exports = router;
