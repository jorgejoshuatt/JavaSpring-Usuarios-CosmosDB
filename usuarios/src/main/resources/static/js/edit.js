const rutaActual = window.location.href;
const partir = rutaActual.split("/");
const variableUserId = partir[partir.length - 1];

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
                    console.log(response);
                    console.log('El usuario fue actualizado con éxito');
                    // INICIO ALERTA
                    (async () => {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Usuario actualizado correctamente!',
                            text: 'Gracias por probar la funcionalidad de actualizar ❤',
                            timer: 6000,
                        })
                        window.location.href = `/users`;
                    })();
                    // FINAL ALERTA
                })
                .catch(error => {
                    console.error('Hubo un error al actualizar el usuario', error);
                    // INICIO ALERTA
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar el usuario',
                        text: 'Por favor verifique los campos e intente nuevamente 😢',
                        timer: 6000,
                    })
                    // FINAL ALERTA
                });
        });
    })
    .catch((error) => {
        console.log(error);
    });
