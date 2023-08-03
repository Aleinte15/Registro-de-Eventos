document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento input
    var name = document.getElementById('name');
    var nameLocal = localStorage.getItem('loggedIn');
    console.log(nameLocal);
    var newname = nameLocal;
    name.textContent = newname;
});

