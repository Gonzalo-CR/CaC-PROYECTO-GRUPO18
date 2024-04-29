document.addEventListener("DOMContentLoaded", function() {
    var forgetPasswordForm = document.getElementById("forgetPasswordForm");

    forgetPasswordForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var email = document.getElementById("email").value;

        // Envío de la solicitud de recuperación al servidor
        fetch('/forget_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }).then(response => {
            // Manejar la respuesta del servidor
            console.log("Solicitud de recuperación enviada.");
            alert("Se ha enviado un correo de recuperación de contraseña.");
        }).catch(error => {
            console.error("Error al enviar la solicitud de recuperación:", error);
            alert("Ocurrió un error al enviar la solicitud de recuperación.");
        });
    });
});
