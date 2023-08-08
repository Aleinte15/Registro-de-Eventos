function crearEvento(event) {
    event.preventDefault();
    const nombreResponsable = document.getElementById("nombre").value;
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
        nombreEvento: nombreEvento,
        fechaEvento: fechaEvento,
        cantidadInvitados: cantidadInvitados,
        user: nameLocal


    };
    saveEvento(nuevoEvento);


}


function saveEvento(evento) {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    alert("Evento creado")
    window.location.href = 'invitados.html';
}