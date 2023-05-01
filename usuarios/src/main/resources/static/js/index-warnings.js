const userNameLabel = document.querySelector('#username');
const userNameStatus = document.querySelector('#warning-username');

async function updatingUsernameExistanceStatus(username) {
  console.log('starting request to api/usuarios');
  const requestUserName = await axios.get(`/api/usuarios/user/${username}`)
    .then(res => res.data[0].nombre_usuario)
    .then(userjson => userjson)
    .catch(err => console.log(err));

  const isInDatabase = userNameLabel.value == requestUserName ? true : false;
  if (!isInDatabase) {
    userNameStatus.innerText = "Nombre de usuario displonible";
    userNameStatus.classList.remove('warning-inactive');
    userNameStatus.classList.add('warning-active');
  } else {
    userNameStatus.innerText = "Intenta con otro nombre de usuario";
    userNameStatus.classList.remove('warning-active');
    userNameStatus.classList.add('warning-inactive');
  }
}

function waitingForStatus () {
  console.log('Stoped interval and timeout');
  userNameStatus.classList.remove('warning-active');
  userNameStatus.classList.remove('warning-inactive');
  userNameStatus.innerText = "Un momento...";
  clearInterval(interval);
  clearTimeout(timeout);
  count = 0;
}


let count = 0;
let interval;
let timeout;

userNameLabel.addEventListener('focus', e => {
  userNameStatus.style.height = "16px";
});

userNameLabel.addEventListener('keydown', waitingForStatus);

userNameLabel.addEventListener('keyup', e => {
  count = 0;
  console.log('starting countdown to make request');

  interval = setInterval(() => {
    count += 100;
  }, 100);

  if (e.target.value.length >= 8) {
    timeout = setTimeout(() => {
      clearInterval(interval);
      updatingUsernameExistanceStatus(e.target.value);
    }, 2000);
  } else {
    userNameStatus.innerText = "Al menos 8 caracteres";
    userNameStatus.classList.remove('warning-active');
    userNameStatus.classList.add('warning-inactive');
  }
});