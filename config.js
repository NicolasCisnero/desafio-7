const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuración de la sesión
app.use(
  session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
  })
);

// Configuración de Express para manejar datos JSON
app.use(express.json());

// Rutas de tu aplicación
// Define las rutas para el registro, login, productos y logout aquí

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
