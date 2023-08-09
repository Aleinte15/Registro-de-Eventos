function crearEvento(event) {
    event.preventDefault();
    const nombreResponsable = document.getElementById("nombre").value;
    const nombreEvento = document.getElementById("nombreEvento").value;
    const fechaEvento = document.getElementById("fechaEvento").value;
    const cantidadInvitados = document.getElementById("cantidadInvitados").value;


     // Obtiene el valor de "idEvento" del almacenamiento local.
    var idEvento = localStorage.getItem("idEvento");
      // Si "idEvento" existe, incrementa su valor en 1 y actualiza el almacenamiento local.
    if (idEvento) {
        idEvento = parseInt(idEvento) + 1;
        localStorage.setItem("idEvento", idEvento);

    } else {
        idEvento = 1;
        localStorage.setItem("idEvento", idEvento);
    }
     // Obtiene el nombre de usuario almacenado en el almacenamiento local.
    var nameLocal = localStorage.getItem('loggedIn');
     // Crea un objeto "nuevoEvento" con la información recopilada.
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
// Este código asigna una función al evento de clic en el botón de sesión.
const boton = document.getElementById('btnSession');
boton.onclick = function () {


    // Establece la clave "sessionActive" en el almacenamiento local como "false".
    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}


function saveEvento(evento) {
      // Convierte el objeto evento a una cadena JSON y lo almacena con la clave "eventoEditado".
    const eventoJSON = JSON.stringify(evento);
    localStorage.setItem("eventoEditado", eventoJSON);
        // Obtiene la lista de eventos del almacenamiento local o crea una nueva lista vacía.
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    alert("Evento creado")
     // Redirige la página actual a 'invitados.html' después de realizar la acción.
    window.location.href = 'invitados.html';
}