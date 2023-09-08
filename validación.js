// Ruta de login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        // Usuario administrador
        req.session.user = { email, role: 'admin' };
        return res.json({ message: 'Inicio de sesión exitoso (admin)' });
      }
      // Si no es el administrador, busca en la base de datos
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
  