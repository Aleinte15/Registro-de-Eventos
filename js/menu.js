document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento input
    var sessionActive = localStorage.getItem('sessionActive');

    if (sessionActive == "true") {
        var name = document.getElementById('name');
        var nameLocal = localStorage.getItem('loggedIn');
        console.log(nameLocal);
        var newname = nameLocal;
        name.textContent = newname;
    } else {
        window.location.href = 'login.html';
    }
});


const boton = document.getElementById('btnSession');

// Agregamos un evento onclick al botón
boton.onclick = function () {

    localStorage.setItem("sessionActive", false)
    window.location.href = 'login.html';

}