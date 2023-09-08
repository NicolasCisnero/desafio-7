const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Modelo de usuario
const User = require('../models/User');

// Ruta de registro
router.post('/registro', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crea un nuevo usuario
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    // Compara las contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    // Crea una sesión
    req.session.user = user;
    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta de productos
router.get('/productos', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
  // Obtén los datos del usuario y su rol
  const { email, role } = req.session.user;
  res.json({ message: 'Bienvenido', email, role });
});

// Ruta de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Sesión cerrada con éxito' });
    }
  });
});

module.exports = router;
