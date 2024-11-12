// routes/usuario.js
const express = require('express');
const Usuario = require('../models/Usuario');
const Alumno = require('../models/Alumno');
const auth = require('../middleware/auth');
const router = express.Router();

// Ruta para asociar un alumno al usuario autenticado
router.post('/asociar-alumno', auth, async (req, res) => {
  const { alumnoId } = req.body;

  try {
    const usuario = await Usuario.findById(req.userId);
    
    // Verifica si el usuario ya tiene un alumno asociado
    if (usuario.alumno) {
      return res.status(400).json({ message: 'Ya tienes un alumno asociado.' });
    }

    // Verifica si el alumno ya está asociado a otro usuario
    const alumno = await Alumno.findById(alumnoId);
    if (alumno.usuario) {
      return res.status(400).json({ message: 'Este alumno ya está asociado a otro usuario.' });
    }

    // Asocia el alumno al usuario
    usuario.alumno = alumnoId;
    await usuario.save();

    // Asocia el usuario al alumno
    alumno.usuario = usuario._id;
    await alumno.save();

    res.status(200).json({ message: 'Alumno asociado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asociar el alumno.' });
  }
});

// Ruta para asignar cursos al usuario autenticado y crear el progreso inicial
router.post('/asignar-cursos', auth, async (req, res) => {
  const { cursos } = req.body;

  try {
    const usuario = await Usuario.findById(req.userId);
    
    const nuevosProgresos = [];

    // Asigna cursos y crea progresos iniciales
    for (const cursoId of cursos) {
      // Evita duplicar cursos
      if (!usuario.cursos.includes(cursoId)) {
        usuario.cursos.push(cursoId);

        // Crea un progreso inicial para el curso
        const progreso = new Progreso({
          usuario: usuario._id,
          curso: cursoId,
          porcentajeCompletado: 0
        });

        await progreso.save();
        nuevosProgresos.push(progreso._id);
      }
    }

    // Agregar los progresos al usuario y guardar
    usuario.progresos.push(...nuevosProgresos);
    await usuario.save();

    res.status(200).json({ message: 'Cursos y progresos asignados exitosamente.' });
  } catch (error) {
    console.error('Error al asignar los cursos y crear progresos:', error);
    res.status(500).json({ message: 'Error al asignar los cursos.' });
  }
});

// routes/usuario.js
// Ruta para obtener el progreso de los cursos del usuario autenticado
router.get('/progresos', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).populate({
      path: 'progresos',
      populate: { path: 'curso', select: 'nombre catedra' } // Poblar detalles del curso en el progreso
    });

    res.status(200).json(usuario.progresos);
  } catch (error) {
    console.error('Error al obtener los progresos:', error);
    res.status(500).json({ message: 'Error al obtener los progresos.' });
  }
});

module.exports = router;
