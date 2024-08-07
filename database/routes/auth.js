const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuración de multer para manejar las subidas de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
    }
});

const upload = multer({ storage: storage });

// Middleware para verificar el token JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token de autenticación no proporcionado');
    }

    jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }
        req.userId = decoded.userId;
        next();
    });
};

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const query = 'SELECT * FROM usuario';
        req.db.execute(query, (error, results) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
                return res.status(500).send('Error al obtener usuarios');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
}); 

// Rutas de autenticación
// Ruta para registrar usuarios con imagen
router.post('/register', upload.single('imagen'), async (req, res) => {
    const { nombre, apellidos, edad, correo, numero_telefono, password } = req.body;
    const imagen = req.file ? req.file.path : null; // Ruta de la imagen subida, si existe

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptación de la contraseña

        // Query para insertar usuario en la base de datos
        const query = 'INSERT INTO usuario (nombre, apellidos, edad, correo, numero_telefono, imagen, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
        req.db.execute(query, [nombre, apellidos, edad, correo, numero_telefono, imagen, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error al registrar usuario:', error);
                return res.status(500).send('Error al registrar usuario');
            }
            res.status(201).send('Usuario registrado');
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    try {
        const query = 'SELECT * FROM usuario WHERE correo = ?';
        req.db.execute(query, [correo], async (error, results) => {
            if (error || results.length === 0) {
                return res.status(400).send('Usuario no encontrado');
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.contrasena);
            if (!isMatch) {
                return res.status(400).send('Contraseña incorrecta');
            }

            const token = jwt.sign({ userId: user.id }, 'secret_key');
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Error en el servidor al iniciar sesión:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Query para obtener los datos del usuario desde la base de datos
        const query = 'SELECT nombre, apellidos, edad, correo, numero_telefono, imagen FROM usuario WHERE id = ?';
        req.db.execute(query, [req.userId], (error, results) => {
            if (error || results.length === 0) {
                return res.status(404).send('Usuario no encontrado');
            }

            const userProfile = {
                nombre: results[0].nombre,
                apellidos: results[0].apellidos,
                edad: results[0].edad,
                correo: results[0].correo,
                numero_telefono: results[0].numero_telefono,
                imagen: results[0].imagen
            };

            res.status(200).json(userProfile);
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener la imagen de perfil del usuario
router.get('/profile/image', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId; // Obtener el ID de usuario del token decodificado
        // Realiza la consulta para obtener la ruta de la imagen de perfil desde tu base de datos
        const query = 'SELECT imagen FROM usuario WHERE id = ?';
        req.db.execute(query, [userId], (error, results) => {
            if (error || results.length === 0 || !results[0].imagen) {
                return res.status(404).send('Imagen de perfil no encontrada');
            }
            // Construye la ruta completa del archivo de imagen
            const imagePath = path.join(__dirname, '..', results[0].imagen);
            res.sendFile(imagePath); // Envia el archivo de imagen al cliente
        });
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        res.status(500).send('Error al obtener la imagen de perfil');
    }
});

// Rutas del blog
// Ruta para crear un nuevo post
router.post('/posts', authMiddleware, async (req, res) => {
    const { titulo, contenido } = req.body;
    const autor_id = req.userId;

    try {
        const query = 'INSERT INTO posts (titulo, contenido, autor_id) VALUES (?, ?, ?)';
        req.db.execute(query, [titulo, contenido, autor_id], (error, results) => {
            if (error) {
                console.error('Error al crear post:', error);
                return res.status(500).send('Error al crear post');
            }
            res.status(201).send('Post creado');
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los posts
router.get('/posts', async (req, res) => {
    try {
        const query = 'SELECT p.*, u.nombre AS autor_nombre FROM posts p JOIN usuario u ON p.autor_id = u.id';
        req.db.execute(query, (error, results) => {
            if (error) {
                console.error('Error al obtener posts:', error);
                return res.status(500).send('Error al obtener posts');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los comentarios
router.get('/comentarios', async (req, res) => {
    try {
        const query = `
            SELECT c.*, u.nombre AS autor_nombre, p.titulo AS post_titulo 
            FROM comentarios c 
            JOIN usuario u ON c.autor_id = u.id 
            JOIN posts p ON c.post_id = p.id
            LEFT JOIN comentarios parent ON c.parent_id = parent.id
        `;
        req.db.execute(query, (error, results) => {
            if (error) {
                console.error('Error al obtener comentarios:', error);
                return res.status(500).send('Error al obtener comentarios');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para agregar un nuevo comentario
router.post('/posts/:post_id/comentarios', authMiddleware, async (req, res) => {
    const { post_id } = req.params;
    const { contenido } = req.body;
    const userId = req.userId;

    try {
        const query = 'INSERT INTO comentarios (post_id, autor_id, contenido) VALUES (?, ?, ?)';
        req.db.execute(query, [post_id, userId, contenido], (error, results) => {
            if (error) {
                console.error('Error al agregar comentario:', error);
                return res.status(500).send('Error al agregar comentario');
            }
            res.status(201).send('Comentario agregado');
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});


// Ruta para obtener los comentarios de un post
router.get('/posts/:post_id/comentarios', async (req, res) => {
    const { post_id } = req.params; // Cambiado a post_id para que coincida con el parámetro en la ruta

    try {
        const query = 'SELECT c.*, u.nombre, u.apellidos FROM comentarios c JOIN usuario u ON c.autor_id = u.id WHERE c.post_id = ?';
        req.db.execute(query, [post_id], (error, results) => {
            if (error) {
                console.error('Error al obtener comentarios:', error);
                return res.status(500).send('Error al obtener comentarios');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para insertar datos en la tabla FormularioContacto
router.post('/insertar', (req, res) => {
    const { nombre_empresa_escuela, municipio, tema_platica, direccion, correo_electronico, numero_telefono, mensaje } = req.body;

    const query = `
        INSERT INTO FormularioContacto (nombre_empresa_escuela, municipio, tema_platica, direccion, correo_electronico, numero_telefono, mensaje)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    req.db.query(query, [nombre_empresa_escuela, municipio, tema_platica, direccion, correo_electronico, numero_telefono, mensaje], (err, result) => {
        if (err) {
            console.error('Error insertando datos en la tabla:', err);
            res.status(500).send('Error insertando datos');
            return;
        }
        res.status(200).send('Datos insertados correctamente');
    });
});

// Ruta para obtener los datos de la tabla FormularioContacto
router.get('/formularios', (req, res) => {
    const query = 'SELECT * FROM FormularioContacto';

    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo datos de la tabla:', err);
            res.status(500).send('Error obteniendo datos');
            return;
        }
        res.status(200).json(results);
    });
});

// Ruta para crear un nuevo registro en el formulario
router.post('/formuno', (req, res) => {
    const { enfermedades_cronicas, embarazo, sobrepeso_obesidad, programa_actividad_fisica, programa_nutricion, contraindicacion_actividad_fisica } = req.body;
    const sql = 'INSERT INTO formuno (enfermedades_cronicas, embarazo, sobrepeso_obesidad, programa_actividad_fisica, programa_nutricion, contraindicacion_actividad_fisica) VALUES (?, ?, ?, ?, ?, ?)';
    
    req.db.query(sql, [
        enfermedades_cronicas, 
        embarazo, 
        sobrepeso_obesidad, 
        programa_actividad_fisica, 
        programa_nutricion, 
        contraindicacion_actividad_fisica
    ], (err, result) => {
        if (err) {
            console.error('Error al crear un nuevo registro en el formulario:', err);
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Error al crear un nuevo registro en el formulario' });
            }
            return;
        }

        if (!res.headersSent) {
            res.status(201).json({ message: 'Registro creado exitosamente' });
        }
    });
});

// Ruta para crear un nuevo registro en formulario_salud
router.get('/insertar', (req, res) => {
    const {
      nombre_apellidos,
      fecha_nacimiento,
      sexo,
      estado_civil,
      escolaridad,
      servicios_basicos,
      lugar_nacimiento,
      estado_vives,
      municipio_vives,
      telefono_contacto,
      correo_electronico,
      religion,
      ocupacion,
      apoyo_gobierno,
      grupo_etnico,
      afiliacion_institucion,
      ingreso_mensual,
      egreso_mensual,
      estudios_jefe_hogar,
      numero_banos,
      numero_automoviles,
      internet_hogar,
      personas_trabajaron_mes,
      cuartos_para_dormir,
      familiar_vive_usa,
      sabe_proyecto_vida,
      tiene_proyecto_vida,
      estilo_vida_sano
    } = req.query;
  
    const sql = `
      INSERT INTO formdos SET
        nombre_apellidos = ?,
        fecha_nacimiento = ?,
        sexo = ?,
        estado_civil = ?,
        escolaridad = ?,
        servicios_basicos = ?,
        lugar_nacimiento = ?,
        estado_vives = ?,
        municipio_vives = ?,
        telefono_contacto = ?,
        correo_electronico = ?,
        religion = ?,
        ocupacion = ?,
        apoyo_gobierno = ?,
        grupo_etnico = ?,
        afiliacion_institucion = ?,
        ingreso_mensual = ?,
        egreso_mensual = ?,
        estudios_jefe_hogar = ?,
        numero_banos = ?,
        numero_automoviles = ?,
        internet_hogar = ?,
        personas_trabajaron_mes = ?,
        cuartos_para_dormir = ?,
        familiar_vive_usa = ?,
        sabe_proyecto_vida = ?,
        tiene_proyecto_vida = ?,
        estilo_vida_sano = ?
    `;
  
    req.db.query(sql, [
      nombre_apellidos,
      fecha_nacimiento,
      sexo,
      estado_civil,
      escolaridad,
      servicios_basicos,
      lugar_nacimiento,
      estado_vives,
      municipio_vives,
      telefono_contacto,
      correo_electronico,
      religion,
      ocupacion,
      apoyo_gobierno,
      grupo_etnico,
      afiliacion_institucion,
      ingreso_mensual,
      egreso_mensual,
      estudios_jefe_hogar,
      numero_banos,
      numero_automoviles,
      internet_hogar,
      personas_trabajaron_mes,
      cuartos_para_dormir,
      familiar_vive_usa,
      sabe_proyecto_vida,
      tiene_proyecto_vida,
      estilo_vida_sano
    ], (error, results) => {
      if (error) {
        res.status(500).send(`Error al insertar datos: ${error}`);
      } else {
        res.send('Datos insertados correctamente');
      }
    });
  });

  // Ruta para insertar datos
router.get('/formtres', (req, res) => {
    const {
        pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,
        pregunta6, pregunta7, pregunta8, pregunta9, pregunta10, pregunta11,
        pregunta12, pregunta13, pregunta14, pregunta15
    } = req.query;

    const sql = `INSERT INTO formtres (
        pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,
        pregunta6, pregunta7, pregunta8, pregunta9, pregunta10, pregunta11,
        pregunta12, pregunta13, pregunta14, pregunta15
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    req.db.query(sql, [
        pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,
        pregunta6, pregunta7, pregunta8, pregunta9, pregunta10, pregunta11,
        pregunta12, pregunta13, pregunta14, pregunta15
    ], (err, results) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Hubo un error al insertar los datos.');
            return;
        }
        res.send('Datos insertados correctamente.');
    });
});

// Ruta para insertar datos en la tabla experiencia_personal usando GET
router.get('/formfour', (req, res) => {
    const { me_gusta_mi_vida, soy_una_persona_feliz, estoy_satisfecho, mi_vida_me_trae_alegria, mi_vida_es_feliz, disfruto_de_mi_vida, mi_vida_es_maravillosa, estoy_de_buenas } = req.query;

    const sql = `
        INSERT INTO formfour (
            me_gusta_mi_vida, 
            soy_una_persona_feliz, 
            estoy_satisfecho, 
            mi_vida_me_trae_alegria, 
            mi_vida_es_feliz, 
            disfruto_de_mi_vida, 
            mi_vida_es_maravillosa, 
            estoy_de_buenas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        me_gusta_mi_vida,
        soy_una_persona_feliz,
        estoy_satisfecho,
        mi_vida_me_trae_alegria,
        mi_vida_es_feliz,
        disfruto_de_mi_vida,
        mi_vida_es_maravillosa,
        estoy_de_buenas
    ];

    req.db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).send('Error al insertar datos en la base de datos');
        }
        res.send('Datos insertados correctamente');
    });
});

//Ruta para el quinto formulario
router.get('/formcin', (req, res) => {
    const { identificador, respeto_mi_cuerpo, me_siento_bien_con_mi_cuerpo, siento_que_mi_cuerpo_tiene_buenas_cualidades, actitud_positiva_hacia_mi_cuerpo, atento_a_las_necesidades_de_mi_cuerpo, siento_amor_por_mi_cuerpo, valoro_caracteristicas_unicas_de_mi_cuerpo, comportamiento_refleja_actitud_positiva, me_siento_a_gusto_con_mi_cuerpo, me_siento_guapo_aunque_diferente_de_modelos } = req.query;

    const query = `
        INSERT INTO formcin (
            identificador, respeto_mi_cuerpo, me_siento_bien_con_mi_cuerpo, siento_que_mi_cuerpo_tiene_buenas_cualidades, actitud_positiva_hacia_mi_cuerpo, atento_a_las_necesidades_de_mi_cuerpo, siento_amor_por_mi_cuerpo, valoro_caracteristicas_unicas_de_mi_cuerpo, comportamiento_refleja_actitud_positiva, me_siento_a_gusto_con_mi_cuerpo, me_siento_guapo_aunque_diferente_de_modelos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [identificador, respeto_mi_cuerpo, me_siento_bien_con_mi_cuerpo, siento_que_mi_cuerpo_tiene_buenas_cualidades, actitud_positiva_hacia_mi_cuerpo, atento_a_las_necesidades_de_mi_cuerpo, siento_amor_por_mi_cuerpo, valoro_caracteristicas_unicas_de_mi_cuerpo, comportamiento_refleja_actitud_positiva, me_siento_a_gusto_con_mi_cuerpo, me_siento_guapo_aunque_diferente_de_modelos];

    req.db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.status(200).send('Datos insertados correctamente');
        }
    });
});

// Ruta para obtener un identificador por ID
router.get('/ident', (req, res) => {
    const identificador = req.query.identificador;

    if (!identificador) {
        return res.status(400).json({ error: 'El parámetro identificador es requerido.' });
    }

    const query = 'SELECT * FROM formcin WHERE identificador = ?';
    
    req.db.query(query, [identificador], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).json({ error: 'Error en el servidor.' });
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Identificador no encontrado.' });
        }
    });
});

// Ruta para insertar una nueva cita
router.get('/insertar-cita', (req, res) => {
    const { nombre, apellido, correo, fecha, hora_inicio, hora_fin, tipo_cita } = req.query;

    // Verificar si ya existe una cita en el mismo horario
    const checkQuery = `
        SELECT COUNT(*) AS count
        FROM citas
        WHERE fecha = ? AND (
            (hora_inicio <= ? AND hora_fin > ?) OR
            (hora_inicio < ? AND hora_fin >= ?)
        )
    `;

    req.db.query(checkQuery, [fecha, hora_inicio, hora_inicio, hora_fin, hora_fin], (err, results) => {
        if (err) {
            console.error('Error al verificar disponibilidad:', err);
            return res.status(500).json('Error al verificar disponibilidad');
        }

        const count = results[0].count;

        if (count > 0) {
            return res.status(400).json('El horario seleccionado ya está ocupado');
        }

        // Insertar nueva cita si el horario está disponible
        const insertQuery = `
            INSERT INTO citas (nombre, apellido, correo, fecha, hora_inicio, hora_fin, tipo_cita)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        req.db.query(insertQuery, [nombre, apellido, correo, fecha, hora_inicio, hora_fin, tipo_cita], (err, results) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                return res.status(500).json('Error al insertar datos');
            }
            res.status(200).send('Datos insertados exitosamente');
        });
    });
});

// Datos del primer formulario
router.get('/mostrar-formuno', (req, res) => {
    const query = 'SELECT * FROM formuno';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

// Datos del segundo formulario
router.get('/mostrar-formdos', (req, res) => {
    const query = 'SELECT * FROM formdos';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

// Datos del tercer formulario
router.get('/mostrar-formtres', (req, res) => {
    const query = 'SELECT * FROM formtres';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

// Datos del cuarto formulario
router.get('/mostrar-formfour', (req, res) => {
    const query = 'SELECT * FROM formfour';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            return res.status(500).send('Error al obtener datos');
        }
        res.json(results);
    });
});

// Datos del quinto formulario
router.get('/mostrar-formcin', (req, res) => {
    const query = 'SELECT * FROM formcin';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            return res.status(500).send('Error al obtener datos');
        }
        res.json(results);
    });
});

// Ruta para obtener datos de la tabla citas
router.get('/mostrar-citas', (req, res) => {
    const query = 'SELECT * FROM citas';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            return res.status(500).send('Error al obtener datos');
        }
        res.json(results);
    });
});

module.exports = router;