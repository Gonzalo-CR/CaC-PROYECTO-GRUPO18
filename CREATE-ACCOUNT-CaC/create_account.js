document.addEventListener("DOMContentLoaded", function() {
    var createAccountForm = document.getElementById("createAccountForm");

    createAccountForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirm_password = document.getElementById("confirm_password").value;

        if (password !== confirm_password) {
            alert("Password and confirm password do not match.");
            return;
        }

        // Hashing de la contraseña con salting en el lado del cliente (JavaScript)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Envío del hash al servidor (AJAX)
                fetch('/guardar_usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: hash
                    })
                }).then(response => {
                    // Manejar la respuesta del servidor
                    console.log("Usuario creado exitosamente.");
                }).catch(error => {
                    console.error("Error al crear usuario:", error);
                });
            });
        });
    });
});
