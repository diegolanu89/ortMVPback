// cargarCursos.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Curso = require('./models/Cursos'); // Asegúrate de que el modelo Curso esté en la ruta correcta
const Usuario = require('./models/Usuario'); // Asegúrate de que el modelo Usuario esté en la ruta correcta
require('dotenv').config();

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

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

// Función para cargar cursos en la base de datos
const cargarCursos = async () => {
  try {
    await Curso.deleteMany(); // Limpiar la colección de cursos
    console.log('Colección de cursos eliminada');

    const cursos = await Curso.insertMany(cursosData); // Insertar los datos ficticios
    console.log('Datos de cursos cargados exitosamente');
    return cursos;
  } catch (error) {
    console.error('Error al cargar los datos de cursos:', error.message);
    return [];
  }
};

// Función para cargar usuarios en la base de datos
const cargarUsuarios = async () => {
  try {
    await Usuario.deleteMany(); // Limpiar la colección de usuarios
    console.log('Colección de usuarios eliminada');

    // Hashear la contraseña y crear los usuarios
    const usuariosConHash = await Promise.all(
      usuariosData.map(async (usuario) => {
        const contraseñaHasheada = await bcrypt.hash(usuario.contraseña, 10);
        return { ...usuario, contraseña: contraseñaHasheada };
      })
    );

    const usuarios = await Usuario.insertMany(usuariosConHash);
    console.log('Datos de usuarios cargados exitosamente');
    return usuarios;
  } catch (error) {
    console.error('Error al cargar los datos de usuarios:', error.message);
    return [];
  }
};

// Función para asignar cursos aleatorios a los usuarios
const asignarCursosAleatorios = async (usuarios, cursos) => {
  try {
    for (const usuario of usuarios) {
      // Seleccionar aleatoriamente entre 1 y 5 cursos para cada usuario
      const numeroDeCursos = Math.floor(Math.random() * 5) + 1;
      const cursosAsignados = [];

      while (cursosAsignados.length < numeroDeCursos) {
        const cursoAleatorio = cursos[Math.floor(Math.random() * cursos.length)];
        if (!cursosAsignados.includes(cursoAleatorio._id)) {
          cursosAsignados.push(cursoAleatorio._id);
        }
      }

      // Asignar los cursos seleccionados al usuario y guardar
      usuario.cursos = cursosAsignados;
      await usuario.save();
    }

    console.log('Cursos asignados aleatoriamente a cada usuario');
  } catch (error) {
    console.error('Error al asignar cursos a los usuarios:', error.message);
  }
};

// Ejecutar las funciones de carga y asignación
const cargarDatos = async () => {
  await connectDB();

  const cursos = await cargarCursos();
  const usuarios = await cargarUsuarios();

  // Asignar cursos aleatorios si hay cursos y usuarios
  if (cursos.length > 0 && usuarios.length > 0) {
    await asignarCursosAleatorios(usuarios, cursos);
  }

  mongoose.connection.close();
};

cargarDatos();
