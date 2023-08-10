function register(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const confirmPassword = document.getElementById('confirm-password').value;


    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }
    if (name == null && name == "") {
        alert('El nombre no puede quedar vacio');

    }

    var idUser = localStorage.getItem("idUser");
    if (idUser) {
        idUser = parseInt(idUser) + 1;
        localStorage.setItem("idUser", idUser);

    } else {
        idUser = 1;
        localStorage.setItem("idUser", idUser);
    }
    const newUser = {
        id: idUser,
        username: username,
        password: password,
        name: name,
        autentificado: true


    };
    saveUser(newUser);

}
// Esta función guarda un nuevo usuario en el almacenamiento local.
function saveUser(user) {

    var encontrado = findUser(user.username);
    if (encontrado) {
        alert("Ya existe un usuario con ese User name");
    } else {
        // Esta función guarda un nuevo usuario en el almacenamiento local.
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        // Almacena la lista actualizada de usuarios en el almacenamiento local.
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'login.html';
    }
}

// Esta función busca un usuario en la lista de usuarios por su nombre de usuario.
function findUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.username === username);

    return foundUser;
}
