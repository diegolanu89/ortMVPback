
# Proyecto de Gestión de Cursos y Usuarios con Node.js y MongoDB

<p align="left">
   <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-blue">
  <img src="https://img.shields.io/badge/BACKEND-NODE.JS-orange">
  <img src="https://img.shields.io/badge/BD-MONGO%20DB-green">
   <img src="https://img.shields.io/badge/DEPLOY-REST-red">
</p>

Este proyecto es una aplicación básica de backend construida con **Node.js** y **MongoDB**. Permite gestionar cursos y usuarios, asignar cursos a usuarios de forma aleatoria y registrar el progreso de cada usuario en los cursos asignados.

## Contenido

- [Instalación](#instalación)
- [Configuración del Entorno](#configuración-del-entorno)
- [Modelos](#modelos)
- [Rutas API](#rutas-api)
- [Scripts de Carga y Eliminación de Datos](#scripts-de-carga-y-eliminación-de-datos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)

---

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd nombre-del-repositorio
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura el entorno** (ver sección de [Configuración del Entorno](#configuración-del-entorno) para más detalles).

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto y define la URI de conexión a MongoDB. El contenido del archivo `.env` debe verse así:

```plaintext
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre-de-la-bd>?retryWrites=true&w=majority
```

## Modelos

El proyecto utiliza los siguientes modelos de datos, definidos con **Mongoose**:

- **Curso**: representa cada curso disponible.
  - Campos: `nombre`, `catedra`, `horas`.

- **Usuario**: representa a cada usuario registrado.
  - Campos: `nombre`, `email`, `contraseña` (hash), `cursos` (lista de cursos asignados), `progresos` (lista de progreso por curso).

- **Progreso**: representa el progreso de un usuario en un curso.
  - Campos: `usuario` (ID de usuario), `curso` (ID de curso), `porcentajeCompletado`, `fechaInicio`, `fechaUltimaActualizacion`.

## Rutas API

### `/api/cursos`
- **GET** `/api/cursos`: Obtiene la lista de todos los cursos disponibles.

### `/api/usuario`
- **POST** `/api/usuario/asignar-cursos`: Asigna uno o varios cursos a un usuario autenticado y crea un registro de progreso inicial para cada curso asignado.
- **GET** `/api/usuario/progresos`: Obtiene el progreso de los cursos asignados al usuario autenticado.

### `/cargar-datos`
- **GET** `/cargar-datos`: Ejecuta el script para cargar datos ficticios de cursos y usuarios en la base de datos.

### `/eliminar-datos`
- **GET** `/eliminar-datos`: Ejecuta el script para eliminar todos los datos de las colecciones `Cursos`, `Usuarios` y `Progreso`.

## Scripts de Carga y Eliminación de Datos

### Cargar Datos Ficticios

El script `dbSeeder.js` carga datos ficticios de cursos y usuarios en la base de datos. También asigna cursos aleatorios a cada usuario.

- **Uso Manual**:
  ```bash
  node dbSeeder.js
  ```

- **Uso desde el Frontend**:
  Accede a la ruta `/cargar-datos` desde el archivo `cargarDatos.html` en el navegador:
  ```
  http://localhost:3000/cargarDatos.html
  ```
  Haz clic en el botón **Cargar Datos** para ejecutar el script.

### Eliminar Todos los Datos

El script `dbCleaner.js` elimina todos los datos en las colecciones `Cursos`, `Usuarios` y `Progreso`.

- **Uso Manual**:
  ```bash
  node dbCleaner.js
  ```

- **Uso desde el Frontend**:
  Accede a la ruta `/eliminar-datos` desde el archivo `eliminarDatos.html` en el navegador:
  ```
  http://localhost:3000/eliminarDatos.html
  ```
  Haz clic en el botón **Eliminar Datos** para ejecutar el script.

## Ejecución del Proyecto

1. **Ejecuta el servidor**:
   ```bash
   node app.js
   ```

2. **Accede a las Páginas HTML**:
   - **Cargar Datos**: [http://localhost:3000/cargarDatos.html](http://localhost:3000/cargarDatos.html)
   - **Eliminar Datos**: [http://localhost:3000/eliminarDatos.html](http://localhost:3000/eliminarDatos.html)

## Archivos Incluidos

- **`app.js`**: Archivo principal que configura el servidor y las rutas.
- **`dbSeeder.js`**: Script para cargar datos ficticios en la base de datos.
- **`dbCleaner.js`**: Script para eliminar todos los datos de la base de datos.
- **`public/cargarDatos.html`**: Página HTML que permite ejecutar el script de carga de datos desde el navegador.
- **`public/eliminarDatos.html`**: Página HTML que permite ejecutar el script de eliminación de datos desde el navegador.
- **`models/Cursos.js`**: Modelo de datos para `Curso`.
- **`models/Usuario.js`**: Modelo de datos para `Usuario`.
- **`models/Progreso.js`**: Modelo de datos para `Progreso`.
- **`.env`**: Archivo de configuración de entorno (no se sube al repositorio, está excluido en `.gitignore`).
- **`.gitignore`**: Archivo para excluir `node_modules` y `.env` del repositorio Git.


