const express = require('express');
const cors = require('cors');

const UsuarioRepository = require('./repositories/UsuarioRepository');
const UsuarioService = require('./services/UsuarioService');
const UsuarioController = require('./controllers/UsuarioController');
const crearUsuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Bienvenido a la API REST de Gestión de Usuarios' });
});

app.use(crearUsuarioRoutes(usuarioController));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error capturado:', err.message);
    const status = err.status || 500;
    res.status(status).json({
        error: true,
        mensaje: err.message || 'Error interno del servidor.',
        detalles: err.detalles || undefined,
    });
});
// Middleware para rutas que no existen
app.use((req, res) => {
    res.status(404).json({ error: true, mensaje: 'Endpoint no encontrado.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en http://localhost:${PORT}`);
});