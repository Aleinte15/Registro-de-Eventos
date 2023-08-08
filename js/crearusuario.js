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
    const newUser = {
        username: username,
        password: password,
        name: name,
        autentificado: true


    };
    saveUser(newUser);
}

function saveUser(user) {

    var encontrado = findUser(user.username);
    if (encontrado) {
        alert("Ya existe un usuario con ese User name");
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'login.html';
    }
}


function findUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.username === username);

    return foundUser;
}
