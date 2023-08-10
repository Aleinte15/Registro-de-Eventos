
const boton = document.getElementById('btnSession');

boton.onclick = function () {

    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}

const eventos = JSON.parse(localStorage.getItem("eventos"));
var idUsuario = localStorage.getItem('idUsuario');
console.log(idUsuario);


function crearTablaEventosUsuario(idUsuario) {
    const tablaContainer = document.getElementById('tablaContainer');
    tablaContainer.innerHTML = ''; // Limpiamos el contenedor antes de crear la tabla

    var eventosUsuario = new Array();
    if (eventos !== null) {
        eventosUsuario = eventos.filter(evento => evento.idUser == idUsuario);
    }

    if (eventosUsuario.length === 0) {
        tablaContainer.textContent = 'No hay eventos para este usuario.';
        return;
    }

    const tabla = document.createElement('table');

    // Crea la fila de encabezado
    const encabezadoRow = document.createElement('tr');
    for (const key in eventosUsuario[0]) {


        const th = document.createElement('th');
        th.textContent = key;
        if (key === 'nombreEvento') {
            th.textContent = "nombre evento".toUpperCase();
            encabezadoRow.appendChild(th);
        }
        else if (key === 'fechaEvento') {
            th.textContent = "fecha evento".toUpperCase();
            encabezadoRow.appendChild(th);
        }
        else if (key === 'cantidadInvitados') {
            th.textContent = "cantidad Invitados".toUpperCase();
            encabezadoRow.appendChild(th);
        } else {
            th.textContent = key.toUpperCase();
            encabezadoRow.appendChild(th);
        }


    }
    encabezadoRow.innerHTML += '<th>Editar</th><th>Eliminar</th>'; // Agrega encabezados para los botones
    tabla.appendChild(encabezadoRow);

    // Función para manejar el clic en el botón "Editar"
    function handleEditarClick(evento) {
        const eventoJSON = JSON.stringify(evento);
        localStorage.setItem("eventoEditado", eventoJSON);
        window.location.href = 'invitados.html';

    }

    // Función para manejar el clic en el botón "Eliminar"
    function handleEliminarClick(evento, fila) {


        const storedData = JSON.parse(localStorage.getItem('eventos'));

        if (storedData) {

            const updatedData = storedData.filter(item => item.id !== evento.id);

            localStorage.setItem('eventos', JSON.stringify(updatedData));
            const invitadosData = JSON.parse(localStorage.getItem('invitados'));
            if (invitadosData) {
                const updatedInvitados = invitadosData.filter(item => item.id !== evento.id);
                localStorage.setItem('invitados', JSON.stringify(updatedInvitados));
            }

            alert('Objeto eliminado exitosamente.');
        } else {
            console.log('No se encontraron datos en el Local Storage.');
        }
        fila.remove();
    }

    // Crea las filas de datos
    eventosUsuario.forEach(evento => {
        const fila = document.createElement('tr');

        for (const key in evento) {

            const td = document.createElement('td');
            td.textContent = evento[key];
            fila.appendChild(td);

        }

        // Crea los botones para editar y eliminar
        const botonEditar = document.createElement('button');
        botonEditar.className = 'boton-editar';
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => handleEditarClick(evento));

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'boton-eliminar';
        botonEliminar.addEventListener('click', () => handleEliminarClick(evento, fila)); // Pasamos la fila para eliminarla

        // Agrega los botones a la fila
        const tdEditar = document.createElement('td');
        tdEditar.appendChild(botonEditar);
        fila.appendChild(tdEditar);

        const tdEliminar = document.createElement('td');
        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);

        // Agrega la fila a la tabla
        tabla.appendChild(fila);
    });

    tablaContainer.appendChild(tabla);
}

crearTablaEventosUsuario(idUsuario);




