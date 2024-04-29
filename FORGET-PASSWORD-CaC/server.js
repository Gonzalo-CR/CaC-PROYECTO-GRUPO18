const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario_db',
    password: 'contraseña_db',
    database: 'nombre_db'
});

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña'
    }
});

app.use(express.json());

// Endpoint para enviar el correo de recuperación de contraseña
app.post('/forget_password', function(req, res) {
    const email = req.body.email;

    // Consultar la base de datos para obtener la información del usuario
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            console.error("Error al consultar la base de datos:", error);
            res.status(500).send("Error al intentar enviar el correo de recuperación.");
        } else {
            if (results.length > 0) {
                const username = results[0].username;

                // Generar un token de recuperación (puedes implementar esto)
                const recoveryToken = generateRecoveryToken();

                // Configurar el correo de recuperación
                const mailOptions = {
                    from: 'tu_correo@gmail.com',
                    to: email,
                    subject: 'Recuperación de Contraseña - PHLOX',
                    text: `Hola ${username}, has solicitado recuperar tu contraseña. Tu token de recuperación es: ${recoveryToken}. Utiliza este token para restablecer tu contraseña en la página de recuperación de contraseña.`
                };

                // Enviar el correo de recuperación
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.error("Error al enviar el correo de recuperación:", error);
                        res.status(500).send("Error al intentar enviar el correo de recuperación.");
                    } else {
                        console.log('Correo de recuperación enviado:', info.response);
                        res.send("Correo de recuperación enviado exitosamente.");
                    }
                });
            } else {
                res.status(404).send("No se encontró ningún usuario con el correo proporcionado.");
            }
        }
    });
});

app.listen(3000, () => console.log('Servidor en funcionamiento en el puerto 3000.'));

// Función para generar un token de recuperación (puedes implementar esto)
function generateRecoveryToken() {
    // Implementa la lógica para generar un token único y seguro
    return "123456"; // Solo para propósitos de demostración, debes utilizar una implementación segura
}
