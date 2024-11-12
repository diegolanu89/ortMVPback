// dbCleaner.js
const Curso = require('./models/Cursos');
const Usuario = require('./models/Usuario');
const Progreso = require('./models/Progreso'); // Asegúrate de que el modelo Progreso esté en la ruta correcta

// Función para eliminar todos los datos de las colecciones
const eliminarDatos = async () => {
  try {
    await Curso.deleteMany();
    await Usuario.deleteMany();
    await Progreso.deleteMany(); // Elimina datos de Progreso si tienes esta colección
    console.log('Datos eliminados de las colecciones Cursos, Usuarios y Progreso');
  } catch (error) {
    console.error('Error al eliminar los datos:', error);
  }
};

module.exports = eliminarDatos;
