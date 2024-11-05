// server.js
const app = require('./app'); // Importa la instancia de Express desde app.js
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const Usuario = require('./models/Usuario'); // Asegúrate de que el modelo Usuario esté configurado correctamente
const bcrypt = require('bcrypt'); // Importa bcrypt para encriptar la contraseña

const PORT = process.env.PORT || 3000;

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Sincronización de la base de datos y arranque del servidor
sequelize.sync({ force: false }) // Usa { force: true } si quieres que elimine y recree las tablas cada vez
    .then(async () => {
        console.log('Conectado a la base de datos');
        
        // Crear usuario de prueba si no existe
        const [user, created] = await Usuario.findOrCreate({
            where: { email: 'usuario@ejemplo.com' },
            defaults: {
                password: await bcrypt.hash('contraseña123', 10) // Encripta la contraseña
            }
        });

        if (created) {
            console.log('Usuario de prueba creado:', user.email);
        } else {
            console.log('Usuario de prueba ya existe:', user.email);
        }

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al sincronizar con la base de datos:', err);
    });
