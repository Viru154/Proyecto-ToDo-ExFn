const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Genera un token JWT
const generarToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Controlador para el registro
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario
        const newUser = await Usuario.create({
            email,
            password: hashedPassword
        });

        // Genera un token y lo envía al cliente
        const token = generarToken(newUser);
        return res.status(201).json({ token, message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Controlador para el login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario en la base de datos
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Genera un token y lo envía al cliente
        const token = generarToken(user);
        res.json({ token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
