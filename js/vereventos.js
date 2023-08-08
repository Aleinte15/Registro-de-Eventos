
const boton = document.getElementById('btnSession');

boton.onclick = function () {

    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}

const eventos = JSON.parse(localStorage.getItem("eventos"));
var nameLocal = localStorage.getItem('loggedIn');
console.log(nameLocal);


function crearTablaEventosUsuario(nameLocal) {
    const tablaContainer = document.getElementById('tablaContainer');
    tablaContainer.innerHTML = ''; // Limpiamos el contenedor antes de crear la tabla

    const eventosUsuario = eventos.filter(evento => evento.user === nameLocal);

    if (eventosUsuario.length === 0) {
        tablaContainer.textContent = 'No hay eventos para este usuario.';
        return;
    }

    const tabla = document.createElement('table');

    // Crea la fila de encabezado
    const encabezadoRow = document.createElement('tr');
    for (const key in eventosUsuario[0]) {
        if (key === 'contraseña') {
            continue; // Salta esta iteración del bucle y pasa a la siguiente columna
        }

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
        // Convierte el evento a JSON
        const eventoJSON = JSON.stringify(evento);

        // Almacena el evento JSON en el localStorage
        localStorage.setItem("eventoEditado", eventoJSON);

        // Redirige a la página 'invitados.html'
        window.location.href = 'invitados.html';

    }

    // Función para manejar el clic en el botón "Eliminar"
    function handleEliminarClick(evento, fila) {
        // Implementa la lógica para eliminar el evento aquí
        console.log('Eliminar evento:', evento);
        fila.remove(); // Elimina la fila de la tabla
    }

    // Crea las filas de datos
    eventosUsuario.forEach(evento => {
        const fila = document.createElement('tr');

        for (const key in evento) {

            if (key === 'contraseña') {
                continue; // Salta esta iteración del bucle y pasa a la siguiente columna
            }
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

// Ejemplo: Mostrar eventos para el usuario 'mayala'
crearTablaEventosUsuario(nameLocal);




