let users;

axios.get('/api/v1/usuarios')
  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });

const insertUsers = document.getElementById('insert-user');

console.log(insertUsers)
let strList = ''

Object.values(usersTest).forEach(user => {
  strList += `<tr><td data-label="Usuario">${user.nombre}</td><td data-label="Email">${user.correo}</td><td data-label="Usuario">${user.mensaje}</td><td data-label="#">  <button class="button">✏️</button>  <button class="button">🗑️</button></td></tr>`;
});

insertUsers.innerHTML = strList;