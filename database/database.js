// db.js

const mysql = require('mysql2');

// Configuración de la conexión a la base de datos MySQL
function connectDB() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loginregisterdb'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to MySQL database');
    });

    return connection;
}

module.exports = connectDB;
