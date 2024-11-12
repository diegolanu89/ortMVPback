// app.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cursosRoutes = require('./routes/cursos');
const usuarioRoutes = require('./routes/usuario');
const alumnoRoutes = require('./routes/alumnos');
const cargarDatos = require('./dbSeeder'); 
const eliminarDatos = require('./dbCleaner'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Configurar carpeta pública para archivos estáticos
app.use(express.static('public'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/alumnos', alumnoRoutes);

// Ruta para disparar la carga de datos
app.get('/cargar-datos', async (req, res) => {
  try {
    await cargarDatos();
    res.send('Datos de cursos y usuarios cargados exitosamente.');
  } catch (error) {
    res.status(500).send('Error al cargar los datos.');
  }
});

// Ruta para eliminar todos los datos
app.get('/eliminar-datos', async (req, res) => {
  try {
    await eliminarDatos();
    res.send('Todos los datos de la base de datos fueron eliminados exitosamente.');
  } catch (error) {
    res.status(500).send('Error al eliminar los datos.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



