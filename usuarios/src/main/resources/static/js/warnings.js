
export let formValidationState = {
  username: null,
  email: null,
  password: null,
  passwordConfirm: null
}
// the entire global state for all inputs on the form
// indicates if all fields passes its validations

// all labels for warnings and inputs
const usernameInput = document.querySelector('#username');
const usernameStatus = document.querySelector('#warning-username');

const emailInput = document.querySelector('#email');
const emailStatus = document.querySelector('#warning-email');

const passwordInput = document.querySelector('#password');
const pswdSttsLngth = document.querySelector('.password-warnings :nth-child(1)');
const pswdSttsUpper = document.querySelector('.password-warnings :nth-child(2)');
const pswdSttsNmber = document.querySelector('.password-warnings :nth-child(3)');
const pswdSttsSpChr = document.querySelector('.password-warnings :nth-child(4)');
const pswdSttsSmChr = document.querySelector('.password-warnings :nth-child(5)');

const passwordConfirmationInput = document.querySelector('#password-conf');
const passwordConfirmationStatus = document.querySelector('#warning-passconf');

// exclusive use for password validations
let passwordState = {
  length: null,
  uppercase: null,
  number: null,
  specialChar: null,
  repeatedChar: null,
  passwordConfirmed: null
}

// style for labels: label grows when its input is "focusing"
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');

inputs.forEach( input => {
  input.addEventListener('focus', e => {
    const labelValue = e.target.attributes.name.value;
    const label = document.querySelector(`[for=${labelValue}]`);
    label.classList.add('label-active');
  });

  input.addEventListener('focusout', e => {
    const labelValue = e.target.attributes.name.value;
    const label = document.querySelector(`[for=${labelValue}]`);
    label.classList.remove('label-active');
  });
});

// two async functions that queries for username/email existance in database
async function updatingUsernameExistanceStatus(username) {
  const requestUserName = await axios.get(`/api/usuarios/user/${username}`)
    .then(res => res.data[0].nombre_usuario)
    .then(userjson => userjson)
    .catch(e => console.log('available username 👍'));

  const isInDatabase = username == requestUserName ? true : false;
  if (!isInDatabase) {
    formValidationState.username = true;
    usernameStatus.innerText = "Nombre de usuario displonible ✔️";
    usernameStatus.classList.remove('warning-inactive');
    usernameStatus.classList.add('warning-active');
    setTimeout(() => {
      usernameStatus.style.height = "0px";
    }, 2000);
  } else {
    usernameStatus.innerText = "Intenta con otro nombre de usuario ❌";
    usernameStatus.classList.remove('warning-active');
    usernameStatus.classList.add('warning-inactive');
  }
}

async function updatingEmailExistanceStatus(email) {
  const requestEmail = await axios.get(`/api/usuarios/email/${email}`)
    .then(res => res.data[0].correo)
    .then(emailjson => emailjson)
    .catch(e => console.log('available email 👍'));

  const isInDatabase = email == requestEmail ? true : false;
  if (!isInDatabase) {
    formValidationState.email = true;
    emailStatus.innerText = "Correo electrónico disponible ✔️";
    emailStatus.classList.remove('warning-inactive');
    emailStatus.classList.add('warning-active');
    setTimeout(() => {
      emailStatus.style.height = "0px";
    }, 2000);
  } else {
    emailStatus.innerText = "Intenta con otro correo electronico ❌";
    emailStatus.classList.remove('warning-active');
    emailStatus.classList.add('warning-inactive');
  }
}

// maybe i should delete count and interval
let count = 0;
let interval;
let timeout;

// validating username

/**
 * username - focus: starts a message when cursor focuses the input
 * username - keyup: this interaction works as a "countdown" to start a request
 *                   the countdown starts when any key is no longer pressed
 *                   the countdown has 2 seconds to execute the asynchronous function, giving the user time to type any key
 *                   the purpose of this functionality is to not make API requests for each time a key is released, and instead make them two seconds after nothing has been pressed.
 * username - keydown: stops the execution of the countdown
 *                     pressing any key indicates that the user has not finished to write a username
 * 
 * same kind of functionality is for email validation
 */
usernameInput.addEventListener('focus', e => {
  usernameStatus.style.height = "16px";
  if ((e.target.value == '')) {
    usernameStatus.innerText = "Introduce un usuario";
  }
});

usernameInput.addEventListener('keydown', e => {
  usernameStatus.classList.remove('warning-active');
  usernameStatus.classList.remove('warning-inactive');
  usernameStatus.style.height = "16px";
  usernameStatus.innerText = "Un momento...";
  clearInterval(interval);
  clearTimeout(timeout);
  count = 0;
});

usernameInput.addEventListener('keyup', e => {
  count = 0;
  formValidationState.username = false;

  interval = setInterval(() => {
    count += 100;
  }, 100);

  if (!(e.target.value == '')) {
    if (e.target.value.length >= 8 || e.target.value == '') {
      timeout = setTimeout(() => {
        clearInterval(interval);
        usernameStatus.style.height = "16px";
        updatingUsernameExistanceStatus(e.target.value);
      }, 2000);
    } else {
      usernameStatus.innerText = "Al menos 8 caracteres ❌";
      usernameStatus.classList.remove('warning-active');
      usernameStatus.classList.add('warning-inactive');
    }
  } else {
    emailStatus.innerText = "Introduce un usuario";
  }
});

// validating email
emailInput.addEventListener('focus', e => {
  emailStatus.style.height = "16px";
  if ((e.target.value == '')) {
    emailStatus.innerText = "Introduce un correo";
  }
});

emailInput.addEventListener('keydown', e => {
  usernameStatus.style.height = "16px";
  emailStatus.classList.remove('warning-active');
  emailStatus.classList.remove('warning-inactive');
  emailStatus.innerText = "Un momento...";
  clearInterval(interval);
  clearTimeout(timeout);
  count = 0;
});

emailInput.addEventListener('keyup', e => {
  count = 0;
  formValidationState.email = false;

  interval = setInterval(() => {
    count += 100;
  }, 100);

  const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+((\.[a-zA-Z]+)?){2,}$');

  if (!(e.target.value == '')) {
    if (emailRegex.test(e.target.value)) {
      timeout = setTimeout(() => {
        clearInterval(interval);
        usernameStatus.style.height = "16px";
        updatingEmailExistanceStatus(e.target.value);
      }, 2000);
    } else {
      emailStatus.innerText = "Introduce un correo válido ❌";
      emailStatus.classList.remove('warning-active');
      emailStatus.classList.add('warning-inactive');
    }
  } else {
    emailStatus.innerText = "Introduce un correo";
  }
});


passwordInput.addEventListener('focus', e => {
  passwordInput.classList.remove('warning-active');
  passwordInput.classList.remove('warning-inactive');
  const allPasswordWarnings = document.querySelectorAll('.password-warnings .warnings');
  allPasswordWarnings.forEach(passwordStatus => {
    passwordStatus.style.height = "16px";
  });
});

passwordInput.addEventListener('blur', e => {
  const allPasswordWarnings = document.querySelectorAll('.password-warnings .warnings');

  if (passwordState.length &&
    passwordState.uppercase &&
    passwordState.number &&
    passwordState.specialChar &&
    passwordState.repeatedChar) {
      formValidationState.password = true;
      passwordInput.classList.remove('warning-inactive');
      passwordInput.classList.add('warning-active');
    setTimeout(() => {
      passwordInput.classList.remove('warning-active');
      passwordInput.classList.remove('warning-inactive');
    }, 2000);
  } else {
    formValidationState.password = false;
    passwordInput.classList.remove('warning-active');
    passwordInput.classList.add('warning-inactive');
  }

  allPasswordWarnings.forEach(passwordStatus => {
    passwordStatus.style.height = "0px";
  });
});

passwordInput.addEventListener('keyup', e => {
  const passwordValue = e.target.value;

  if (passwordValue.length < 8 || passwordValue.length > 32) {
    passwordState.length = false;
    pswdSttsLngth.classList.remove('warning-active');
    pswdSttsLngth.classList.add('warning-inactive');
  } else {
    passwordState.length = true;
    pswdSttsLngth.classList.remove('warning-inactive');
    pswdSttsLngth.classList.add('warning-active');
  }

  if (Boolean(passwordValue.match(/[A-Z]/g))) {
    passwordState.uppercase = true;
    pswdSttsUpper.classList.remove('warning-inactive');
    pswdSttsUpper.classList.add('warning-active');
  } else {
    passwordState.uppercase = false;
    pswdSttsUpper.classList.remove('warning-active');
    pswdSttsUpper.classList.add('warning-inactive');
  }

  if (Boolean(passwordValue.match(/[0-9]/g))) {
    passwordState.number = true;
    pswdSttsNmber.classList.remove('warning-inactive');
    pswdSttsNmber.classList.add('warning-active');
  } else {
    passwordState.number = false;
    pswdSttsNmber.classList.remove('warning-active');
    pswdSttsNmber.classList.add('warning-inactive');
  }

  if (Boolean(passwordValue.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g))) {
    passwordState.specialChar = true;
    pswdSttsSpChr.classList.remove('warning-inactive');
    pswdSttsSpChr.classList.add('warning-active');
  } else {
    passwordState.specialChar = false;
    pswdSttsSpChr.classList.remove('warning-active');
    pswdSttsSpChr.classList.add('warning-inactive');
  }

  if (!Boolean(passwordValue.match(/(\w|[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\1{1,}/g))) {
    passwordState.repeatedChar = true;
    pswdSttsSmChr.classList.remove('warning-inactive');
    pswdSttsSmChr.classList.add('warning-active');
  } else {
    passwordState.repeatedChar = false;
    pswdSttsSmChr.classList.remove('warning-active');
    pswdSttsSmChr.classList.add('warning-inactive');
  }
});


passwordConfirmationInput.addEventListener('focus', e => {
  passwordConfirmationStatus.style.height = "16px";
  passwordConfirmationInput.classList.remove('warning-active');
  passwordConfirmationInput.classList.remove('warning-inactive');
  if ((e.target.value == '')) {
    passwordConfirmationStatus.innerText = "Vuelve a introducir tu contraseña";
  }
});

passwordConfirmationInput.addEventListener('blur', e => {
  if (passwordState.passwordConfirmed) {
    formValidationState.passwordConfirm = true;
    passwordConfirmationInput.classList.remove('warning-inactive');
    passwordConfirmationInput.classList.add('warning-active');
    setTimeout(() => {
      passwordConfirmationInput.classList.remove('warning-active');
      passwordConfirmationInput.classList.remove('warning-inactive');
    }, 2000);
  } else {
    passwordConfirmationInput.classList.remove('warning-active');
    passwordConfirmationInput.classList.add('warning-inactive');
  }
  
  passwordConfirmationStatus.style.height = '0px';
});

passwordConfirmationInput.addEventListener('keyup', e => {
  formValidationState.passwordConfirm = false;

  if (!(e.target.value == '')) {
    if (e.target.value == passwordInput.value) {
      passwordState.passwordConfirmed = true;
      formValidationState.passwordConfirm = true;
      passwordConfirmationStatus.innerText = "Contraseñas correctas ✔️";
      passwordConfirmationStatus.classList.remove('warning-inactive');  
      passwordConfirmationStatus.classList.add('warning-active');
      setTimeout(() => {
        passwordConfirmationStatus.style.height = "0px";
      }, 2000);
    } else {
      passwordState.passwordConfirmed = false;
      passwordConfirmationStatus.innerText = "Las contraseñas no coinciden ❌";
      passwordConfirmationStatus.classList.remove('warning-active');
      passwordConfirmationStatus.classList.add('warning-inactive');
    }
  } else {
    passwordConfirmationStatus.innerText = "Vuelve a introducir tu contraseña";
    passwordConfirmationStatus.classList.remove('warning-active');
    passwordConfirmationStatus.classList.remove('warning-inactive');
  }
});

