const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario_db',
    password: 'contraseña_db',
    database: 'nombre_db'
});

app.use(express.json());

// Endpoint para guardar un nuevo usuario en la base de datos
app.post('/guardar_usuario', function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Hashing de la contraseña con salting en el lado del servidor (Node.js)
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Almacenamiento del usuario en la base de datos
            connection.query('INSERT INTO usuarios (username, email, hashed_password) VALUES (?, ?, ?)', [username, email, hash], function (error, results, fields) {
                if (error) {
                    console.error("Error al guardar usuario:", error);
                    res.status(500).send("Error al guardar usuario en la base de datos.");
                } else {
                    res.send("Usuario creado exitosamente.");
                }
            });
        });
    });
});

app.listen(3000, () => console.log('Servidor en funcionamiento en el puerto 3000.'));
