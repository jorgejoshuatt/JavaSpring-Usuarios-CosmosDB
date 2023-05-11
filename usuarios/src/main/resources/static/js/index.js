import { formValidationState } from './warnings.js';

const printFormState = () => {
  console.log(formValidationState);
}

const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const confirmedPasswordInput = document.getElementById('password-conf');
const save = document.getElementById('save');

async function handleUserCreation() {
  const response = await axios.post('/api/usuarios', {
    "nombre_usuario": usernameInput.value,
    "correo": emailInput.value,
    "contrasenia": confirmedPasswordInput.value
  })
  .then( res => res.status)
  .catch( e => {
    Swal.fire({
      title: 'Ups!',
      text: 'Algo salió mal. Intenta escribiendo nuevamente tus datos',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  });

  if (response == 201) {
    Swal.fire({
      title: 'Usuario creado correctamente',
      text: 'Gracias por registrarte en nuestra plataforma 🥰',
      icon: 'success',
      confirmButtonText: '❤'
    }).then( result => {
      if (result.isConfirmed) {
        window.location.href = `/users`;
      }
    });
  }
}

save.addEventListener('click', e => {
  e.preventDefault();
  if (formValidationState.username &&
    formValidationState.email &&
    formValidationState.password &&
    formValidationState.passwordConfirm) {
      handleUserCreation();
    } else {
    Swal.fire({
      title: 'Datos incompletos',
      text: 'Por favor verifique los campos e intente nuevamente 😢',
      icon: 'error',
      confirmButtonText: '👍'
    });
  }
  /*
  axios.post('/api/usuarios', {
    "nombre_usuario": usernameInput.value,
    "correo": emailInput.value,
    "contrasenia": confirmedPasswordInput.value
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
    })
    */
});
