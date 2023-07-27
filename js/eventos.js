function guardarRegistro() {
    const nombreResponsable = document.getElementById("nombreResponsable").value;
    const contraseñaResponsable = document.getElementById("contraseñaResponsable").value;
    const correoResponsable = document.getElementById("correoResponsable").value;
    const nombreEvento = document.getElementById("nombreEvento").value;
    const fechaEvento = document.getElementById("fechaEvento").value;
    const cantidadInvitados = document.getElementById("cantidadInvitados").value;

    if (validarFormulario()) {
        // Aquí puedes realizar las acciones necesarias con los datos ingresados, por ejemplo, enviarlos a un servidor.
        // En este caso, simplemente mostraremos una alerta con los datos ingresados.
        alert(
            `Datos guardados:\n\nNombre del responsable: ${nombreResponsable}\nContraseña del responsable: ${contraseñaResponsable}\nCorreo del responsable: ${correoResponsable}\nNombre del evento: ${nombreEvento}\nFecha del evento: ${fechaEvento}\nCantidad de invitados: ${cantidadInvitados}`
        );
    }
}

function validarFormulario() {
    const form = document.getElementById("registroForm");
    let isValid = true;

    // Iterar sobre todos los campos del formulario y verificar que estén llenos
    for (const input of form.elements) {
        if (input.tagName === "INPUT" && input.required && input.value.trim() === "") {
            isValid = false;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    return isValid;
}
