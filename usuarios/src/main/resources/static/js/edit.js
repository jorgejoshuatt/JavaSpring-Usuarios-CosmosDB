const rutaActual=window.location.href;
const partir=rutaActual.split("/");
const variableUserId = partir[partir.length-1];
axios.get(`/api/usuarios/${variableUserId}`)
    .then((response) => {
        let username = document.getElementById('username');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        const usuario = response.data[0];
        username.value = usuario.nombre_usuario;
        email.value = usuario.correo;
        password.value = usuario.contrasenia;
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
