"use strict"

/*
Run for SpringBoot
async function axiosGet () {
    data = await axios.get('/api/v1/usuarios')
        .then(function (response) {
            console.log(response)
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}
*/

/* Run for visual testing */
const usersList = {
  user1: {
    nombre_usuario: "bruno",
    correo: "indiebrus@gmail.com",
    mensaje: "me gusta el thinner"
  },
  user2: {
    nombre_usuario: "brandon",
    correo: "brandonavendano@gmail.com",
    mensaje: "me gusta el pyto"
  },
  user3: {
    nombre_usuario: "yosh",
    correo: "yoshindia@gmail.com",
    mensaje: "me gusta la India"
  }
};

const insertUsers = document.getElementById('insert-user');
let strList = '';

Object.values(usersList).forEach(user => {
  strList += `<tr><td data-label="Usuario">${user.nombre_usuario}</td><td data-label="Email">${user.correo}</td><td class="row-btns">  <button class="button">✏️</button>  <button class="button">🗑️</button></td></tr>`;
});

insertUsers.innerHTML = strList;