function crearEvento(event) {
    event.preventDefault();
    const nombreResponsable = document.getElementById("nombre").value;
    const contraseñaResponsable = document.getElementById("contraseña").value;
    const correoResponsable = document.getElementById("correo").value;
    const nombreEvento = document.getElementById("nombreEvento").value;
    const fechaEvento = document.getElementById("fechaEvento").value;
    const cantidadInvitados = document.getElementById("cantidadInvitados").value;

    var idEvento = localStorage.getItem("idEvento");
    if (idEvento) {
        idEvento = parseInt(idEvento) + 1;
        localStorage.setItem("idEvento", idEvento);

    } else {
        idEvento = 1;
        localStorage.setItem("idEvento", idEvento);
    }
    var nameLocal = localStorage.getItem('loggedIn');
    const nuevoEvento = {
        id: idEvento,
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
    //window.location.href = 'menu.html';

}


function saveEvento(evento) {
    // En este ejemplo, simplemente almacenamos el objeto de usuario en localStorage.
    // En una aplicación real, esto podría requerir una lógica de backend para guardar la información en un servidor de base de datos.
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    alert("Evento creado")
    window.location.href = 'invitados.html';
}