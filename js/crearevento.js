function crearEvento() {
    const nombreResponsable = document.getElementById("nombre").value;
    const contraseñaResponsable = document.getElementById("contraseña").value;
    const correoResponsable = document.getElementById("correo").value;
    const nombreEvento = document.getElementById("nombreEvento").value;
    const fechaEvento = document.getElementById("fechaEvento").value;
    const cantidadInvitados = document.getElementById("cantidadInvitados").value;

    if (validarFormulario()) {
        alert(
            `Datos guardados:\n\nNombre del responsable: ${nombreResponsable}\nContraseña del responsable: ${contraseñaResponsable}\nCorreo del responsable: ${correoResponsable}\nNombre del evento: ${nombreEvento}\nFecha del evento: ${fechaEvento}\nCantidad de invitados: ${cantidadInvitados}`
        );
    }
    const idEvento= localStorage.getItem("idEvento");
    if (idEvento){
        idEvento+=1;

    }else{
        idEvento=1;
    }
    var nameLocal = localStorage.getItem('loggedIn');
    const nuevoEvento = {
        id:idEvento,
        nombre: nombreResponsable,
        contraseña: contraseñaResponsable,
        correo: correoResponsable,
        nombreEvento: nombreEvento,
        fechaEvento: fechaEvento,
        cantidadInvitados: cantidadInvitados,
        user: nameLocal
    
    
    };
    saveEvento(nuevoEvento);
    
    // Redirigimos a la página de inicio de sesión después del registro exitoso
    window.location.href = 'menu.html';
    
}

function validarFormulario() {
    const form = document.getElementById("registroForm");
    let isValid = true;
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


function saveEvento(evento) {
    // En este ejemplo, simplemente almacenamos el objeto de usuario en localStorage.
    // En una aplicación real, esto podría requerir una lógica de backend para guardar la información en un servidor de base de datos.
    const evento = JSON.parse(localStorage.getItem('evento')) || [];
    evento.push(evento);
    localStorage.setItem('evento', JSON.stringify(evento));
   console.log(localStorage.getItem("evento"));
}