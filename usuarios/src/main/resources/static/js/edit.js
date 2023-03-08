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
        let actualizar = document.getElementById('actualizar');
        actualizar.addEventListener('click', (e) => {
            e.preventDefault();
            axios.put(`/api/usuarios/${variableUserId}`, {
                nombre_usuario: username.value,
                correo: email.value,
                contrasenia: password.value
            })
        .then(response => {
                console.log('El usuario fue actualizado con éxito');
            window.location.href=`/users`;
            })
                .catch(error => {
                    console.error('Hubo un error al actualizar el usuario', error);
                });
        });
        })
    .catch((error) => {
        console.log(error);
    });
