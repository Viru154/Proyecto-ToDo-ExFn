// server.js
const app = require('./app'); // Importa la instancia de Express desde app.js
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // Usa { force: true } si quieres que elimine y recree las tablas cada vez
    .then(() => {
        console.log('Conectado a la base de datos');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => console.error('Error al sincronizar con la base de datos:', err));
