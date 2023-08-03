function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    var user = findUser(username);

    if (user != null) {
        if (username === user.username && password === user.password) {
            // Inicio de sesión exitoso
            // Guardamos el estado de inicio de sesión en localStorage
            localStorage.setItem('loggedIn', username);

            // Redirigimos a la página del menú
            window.location.href = 'menu.html';
        } else {
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
    } else {
        alert('Usuario no encontrado. Inténtalo de nuevo.');
    }
}


function findUser(username) {
    // Obtenemos los usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscamos el usuario por su nombre de usuario
    const foundUser = users.find(user => user.username === username);

    return foundUser; // Devuelve el usuario encontrado o null si no se encuentra
}
