

const boton = document.getElementById('btnSession');

boton.onclick = function () {

    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}


document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento input
    var sessionActive = localStorage.getItem('sessionActive');
    if (sessionActive == "true") {
        var eventoAgregarInvitados = JSON.parse(localStorage.getItem('eventoEditado'));
        var nameEvento = eventoAgregarInvitados.nombreEvento;
        var titleEvento = document.getElementById("title-eventos");
        titleEvento.textContent = "Agregar invitados a: " + nameEvento;
        titleEvento.textContent.toLocaleUpperCase;

    } else {
        window.location.href = 'login.html';
    }
});

function register(event) {
    event.preventDefault();
    var eventoAgregarInvitados = JSON.parse(localStorage.getItem('eventoEditado'));
    const persona = document.getElementById('persona').value;
    const cantidadInvitados = document.getElementById('cantidad').value;
    const observaciones = document.getElementById('observaciones').value;
    var idInvitado = localStorage.getItem("idInvitado");
    if (idInvitado) {
        idInvitado = parseInt(idInvitado) + 1;
        localStorage.setItem("idInvitado", idInvitado);

    } else {
        idInvitado = 1;
        localStorage.setItem("idInvitado", idInvitado);
    }
    const newInvitado = {
        id: idInvitado,
        idEvento: eventoAgregarInvitados.id,
        persona: persona,
        cantidadInvitados: cantidadInvitados,
        observaciones: observaciones,
        confirmado: false
    };
    saveInvitado(newInvitado);
    crearTablaEventosInvitados(idEvento);
    alert("Invitado agregado")


}


var eventoAgregarInvitado = JSON.parse(localStorage.getItem('eventoEditado'));
var idEvento = eventoAgregarInvitado.id;
function crearTablaEventosInvitados(idEvento) {
    var invitados = JSON.parse(localStorage.getItem("invitados"));
    const tablaContainer = document.getElementById('tablaContainer');
    tablaContainer.innerHTML = '';
    var invitadosUsuario = invitados.filter(invitado => invitado.idEvento == idEvento);

    if (invitadosUsuario.length === 0) {
        tablaContainer.textContent = 'Aun no tienes invitados para este evento.';
        return;
    }

    const tabla = document.createElement('table');

    // Crea la fila de encabezado
    const encabezadoRow = document.createElement('tr');
    for (const key in invitadosUsuario[0]) {
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
    encabezadoRow.innerHTML += '<th>Editar</th><th>Eliminar</th><th>Acciones</th>'; // Agrega encabezados para los botones
    tabla.appendChild(encabezadoRow);

    // Función para manejar el clic en el botón "Editar"
    function handleEditarClick(evento) {
        const persona = document.getElementById('persona').value;
        const cantidadInvitados = document.getElementById('cantidad').value;
        const observaciones = document.getElementById('observaciones').value;
        if (persona == "" || cantidadInvitados == "" || observaciones == "") {
            alert("Por favor ingrese todos los campos");
        } else {
            eliminarInvitado(evento);
            evento.persona = persona;
            evento.cantidadInvitados = cantidadInvitados;
            evento.observaciones = observaciones;
            saveInvitado(evento);
            document.getElementById('persona').value = "";
            document.getElementById('cantidad').value = "";
            document.getElementById('observaciones').value = "";
            crearTablaEventosInvitados(idEvento);
            alert('Editado exitosamente.')
        }

    }

    // Función para manejar el clic en el botón "Eliminar"
    function handleEliminarClick(evento, fila) {
        eliminarInvitado(evento);
        alert('Eliminado exitosamente.');
        fila.remove();
    }

    function handleAccionesClick(evento, fila) {
        const invitado = findInvitado(evento.id);
        invitado.confirmado = !invitado.confirmado;
        eliminarInvitado(evento);
        saveInvitado(invitado);
        crearTablaEventosInvitados(idEvento);


    }

    // Crea las filas de datos
    invitadosUsuario.forEach(evento => {
        const fila = document.createElement('tr');

        for (const key in evento) {
            const td = document.createElement('td');

            if (key === "confirmado") {
                if (evento[key] == true) {
                    td.textContent = '✓'; // Símbolo de checkmark para confirmado falso
                    td.className = "check-verde";
                } else {
                    td.textContent = 'X'; // Símbolo de checkmark para confirmado verdadero
                    td.className = "check-rojo";
                }
            } else {
                td.textContent = evento[key];
            }

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

        const botonConfirmar = document.createElement('button');
        if (evento.confirmado == false) {
            botonConfirmar.textContent = 'Confirmar';
        } else {
            botonConfirmar.textContent = 'Desconfirmar';
        }


        botonConfirmar.className = 'boton-confirmar';
        botonConfirmar.addEventListener('click', () => handleAccionesClick(evento, fila)); // Pasamos la fila para eliminarla


        // Agrega los botones a la fila
        const tdEditar = document.createElement('td');
        tdEditar.appendChild(botonEditar);
        fila.appendChild(tdEditar);

        const tdEliminar = document.createElement('td');
        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);

        const tdConfirmar = document.createElement('td');
        tdConfirmar.appendChild(botonConfirmar);
        fila.appendChild(tdConfirmar);

        // Agrega la fila a la tabla
        tabla.appendChild(fila);
    });

    tablaContainer.appendChild(tabla);
}

// Ejemplo: Mostrar eventos para el usuario 'mayala'
crearTablaEventosInvitados(idEvento);



function findInvitado(idInvitado) {
    const invitados = JSON.parse(localStorage.getItem('invitados')) || [];
    const foundInvitado = invitados.find(invitados => invitados.id === idInvitado);
    return foundInvitado;
}

function eliminarInvitado(invitado) {
    const invitadosData = JSON.parse(localStorage.getItem('invitados'));
    if (invitadosData) {
        const updatedInvitados = invitadosData.filter(item => item.id !== invitado.id);
        localStorage.setItem('invitados', JSON.stringify(updatedInvitados));
    }
}


function saveInvitado(invitado) {
    const invitados = JSON.parse(localStorage.getItem('invitados')) || [];
    invitados.push(invitado);
    localStorage.setItem('invitados', JSON.stringify(invitados));
}








