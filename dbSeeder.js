// dbSeeder.js
const bcrypt = require('bcrypt');
const Curso = require('./models/Cursos'); // Asegúrate de que el modelo Curso esté en la ruta correcta
const Usuario = require('./models/Usuario'); // Asegúrate de que el modelo Usuario esté en la ruta correcta

// Datos ficticios de cursos
const cursosData = [
  { nombre: 'Matemáticas Básicas', catedra: 'Matemáticas', horas: 40 },
  { nombre: 'Introducción a la Física', catedra: 'Física', horas: 30 },
  { nombre: 'Química Orgánica', catedra: 'Química', horas: 35 },
  { nombre: 'Historia Universal', catedra: 'Historia', horas: 25 },
  { nombre: 'Inglés para Principiantes', catedra: 'Idiomas', horas: 20 },
  { nombre: 'Programación en JavaScript', catedra: 'Programación', horas: 50 },
  { nombre: 'Estrategias de Marketing', catedra: 'Marketing', horas: 45 },
  { nombre: 'Fundamentos de la Biología', catedra: 'Biología', horas: 38 },
  { nombre: 'Psicología Social', catedra: 'Psicología', horas: 42 },
  { nombre: 'Gestión de Recursos Humanos', catedra: 'RRHH', horas: 32 },
];

// Datos ficticios de usuarios
const usuariosData = [
  { nombre: 'Carlos Pérez', email: 'carlos.perez@example.com', contraseña: '123456' },
  { nombre: 'Ana Gómez', email: 'ana.gomez@example.com', contraseña: '123456' },
  { nombre: 'Luis Ramírez', email: 'luis.ramirez@example.com', contraseña: '123456' },
  { nombre: 'María Rodríguez', email: 'maria.rodriguez@example.com', contraseña: '123456' },
  { nombre: 'José López', email: 'jose.lopez@example.com', contraseña: '123456' },
];

// Función para cargar los cursos y usuarios
const cargarDatos = async () => {
  try {
    await Curso.deleteMany();
    await Usuario.deleteMany();
    console.log('Colecciones limpiadas');

    // Cargar cursos
    const cursos = await Curso.insertMany(cursosData);
    console.log('Cursos cargados');

    // Cargar usuarios con contraseña hasheada
    const usuarios = await Promise.all(
      usuariosData.map(async (usuario) => {
        const contraseñaHasheada = await bcrypt.hash(usuario.contraseña, 10);
        return { ...usuario, contraseña: contraseñaHasheada };
      })
    );
    const usuariosGuardados = await Usuario.insertMany(usuarios);
    console.log('Usuarios cargados');

    // Asignar cursos aleatorios a cada usuario
    for (const usuario of usuariosGuardados) {
      const cursosAsignados = [];
      const numeroDeCursos = Math.floor(Math.random() * cursos.length) + 1;

      while (cursosAsignados.length < numeroDeCursos) {
        const cursoAleatorio = cursos[Math.floor(Math.random() * cursos.length)];
        if (!cursosAsignados.includes(cursoAleatorio._id)) {
          cursosAsignados.push(cursoAleatorio._id);
        }
      }
      usuario.cursos = cursosAsignados;
      await usuario.save();
    }
    console.log('Cursos asignados aleatoriamente a los usuarios');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

module.exports = cargarDatos;
