"use strict"

/*
  usuarios harcodeados para test visual

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
*/

const insertUsers = document.getElementById('insert-user');
let strList = '';

//usuarios = Object.assign({}, usuarios)

let usuarios;

axios.get('/api/usuarios')
    .then(function (response) {
        usuarios = response.data;
        console.log(usuarios);
        usuarios.forEach(user => {
            strList += `<tr><td data-label="Usuario">${user.nombre_usuario}</td><td data-label="Email">${user.correo}</td><td class="row-btns">  <button class="button edit" id="${user.id}">✏️</button>  <button class="button delete" id="${user.id}">🗑️</button></td></tr>`;
        });
        insertUsers.innerHTML = strList;
    })
    .catch(function (error) {
        console.log(error);
    });


let botones = document.querySelectorAll('.delete');
/*
botones.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('boton click borrar');
    const idEliminar = e.target.id;
    console.log(idEliminar);
    /*
    axios.delete(`/${idEliminar}`)
        .then(function (response) {
            console.log(response);
            console.log('User delete successfully !!');
        })
        .catch(function (error) {
            console.log(error);
        });


});
*/

botones.forEach((boton) => {
    boton.addEventListener('click', e => {
        e.preventDefault();
        console.log('clicked')
    })
})
setTimeout()

console.log('ya me ejecute')