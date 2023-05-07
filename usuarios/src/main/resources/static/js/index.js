import { formValidationState } from "./index-warnings";

function printFormState() {
    console.log(formValidationState);
}

let newUser = new Object();
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let save = document.getElementById('save');

save.addEventListener('click', (e) => {
    e.preventDefault();
    newUser.user = username.value;
    newUser.email = email.value;
    newUser.password = password.value;
    save.disabled = true;
    axios.post('/api/usuarios', {
        "nombre_usuario": username.value,
        "correo": email.value,
        "contrasenia": password.value
    })
        .then(function (response) {
            console.log(response);
            console.log(`User ${newUser.user} created successfully !!`);
                // INICIO ALERTA
                (async () => {
                     await Swal.fire({
                        icon: 'success',
                        title: 'Usuario creado correctamente!',
                        text: 'Gracias por registrarte en nuestra plataforma ❤',
                        timer: 6000,
                    })
                    window.location.href = `/users`;
                })();
            // FINAL ALERTA
        })
        .catch(function (error) {
            console.log(error);
            // INICIO ALERTA
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usuario',
                text: 'Por favor verifique los campos e intente nuevamente 😢',
                timer: 6000,
            })
            // FINAL ALERTA
        }).finally(function () {
        save.disabled = false;
    });
});

