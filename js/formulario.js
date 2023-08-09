// Obtener el elemento del botón con el ID 'btnSession'.
const boton = document.getElementById('btnSession');

boton.onclick = function () {

    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}

function guardarRegistro() {
    const nombreResponsable = document.getElementById("nombreResponsable").value;
    const contraseñaResponsable = document.getElementById("contraseñaResponsable").value;
    const correoResponsable = document.getElementById("correoResponsable").value;
    const nombreEvento = document.getElementById("nombreEvento").value;
    const fechaEvento = document.getElementById("fechaEvento").value;
    const cantidadInvitados = document.getElementById("cantidadInvitados").value;

    // Si el formulario es válido según la función de validación, muestra una alerta con los datos recopilados.
    if (validarFormulario()) {
       
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
             // Agregar la clase "error" para resaltar campos no válidos.
            input.classList.add("error");
        } else {
             // Si el campo es válido, remover la clase "error".
            input.classList.remove("error");
        }
    }


 // Devolver true si todos los campos requeridos están llenos, de lo contrario, devolver false.
    return isValid;
}
