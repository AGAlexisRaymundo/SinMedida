const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const connectDB = require('./database'); // Importar la función connectDB desde database.js
const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Multer para manejar las subidas de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
    }
});

const upload = multer({ storage: storage });

// Conectar a la base de datos
const db = connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inyectar la conexión de la base de datos en las rutas
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Rutas de autenticación y blog
app.use('/api/auth', authRoutes);

// Ruta para las imágenes de perfil
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
