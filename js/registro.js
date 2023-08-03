function register(event) {
    event.preventDefault();

    // Obtenemos los valores de los campos de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validamos que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    } 
    if (name == null && name == ""){
        alert ('El nombre no puede quedar vacio');

    }

    // Aquí podrías realizar más validaciones adicionales si es necesario

    // Guardamos la información del nuevo usuario (puedes usar localStorage o cualquier otro medio)
    const newUser = {
        username: username,
        password: password,
        name: name,
        autentificado: true

        
    };
    saveUser(newUser);

    // Redirigimos a la página de inicio de sesión después del registro exitoso
    window.location.href = 'login.html';
}

function saveUser(user) {
    // En este ejemplo, simplemente almacenamos el objeto de usuario en localStorage.
    // En una aplicación real, esto podría requerir una lógica de backend para guardar la información en un servidor de base de datos.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}
