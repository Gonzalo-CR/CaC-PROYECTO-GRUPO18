document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Envío del email y la contraseña al servidor (AJAX)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            // Manejar la respuesta del servidor
            if (response.ok) {
                console.log("Inicio de sesión exitoso.");
            } else {
                console.error("Credenciales inválidas.");
            }
        }).catch(error => {
            console.error("Error al iniciar sesión:", error);
        });
    });
});
