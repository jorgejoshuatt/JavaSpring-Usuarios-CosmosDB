"use strict"

let strList = '';

let usersExample = [
    {
        id:1,
        username:'brus2099',
        email:'brus2099@poyo.com',
        password:'12345678',
    },
    {
        id:2,
        username:'violeta',
        email:'violeta15@poyo.com',
        password:'contraseña',
    },
    {
        id:3,
        username:'brandon69',
        email:'brandon69@poyo.com.gob.mx.org.sex.mx',
        password:'amongus',
    },
    {
        id:4,
        username:'yosh001',
        email:'josh001@poyo.com',
        password:'indiabuda',
    }
]

usersExample.forEach(function (user) {
    strList += `<tr><td data-label="Usuario">${user.username}</td><td data-label="Email">${user.email}</td><td class="row-btns"><button data-userid="${user.id}" class="button edit-btn">✏️</button><button data-userid="${user.id}" class="button delete-btn">🗑️</button></td></tr>`;
});
const insertUsers = document.getElementById('insert-user');
insertUsers.innerHTML = strList;

/*
var strList = '';
axios.get('/api/usuarios')
    .then(function (response) {
        var usuarios = response.data;
        usuarios.forEach(function (user) {
            strList += `<tr><td data-label="Usuario">${user.nombre_usuario}</td><td data-label="Email">${user.correo}</td><td class="row-btns"><button data-userid="${user.id}" class="button edit-btn">✏️</button><button data-userid="${user.id}" class="button delete-btn">🗑️</button></td></tr>`;
        });
        const insertUsers = document.getElementById('insert-user');
        insertUsers.innerHTML = strList;
        //Recopilacion de botones delete y update en un arreglo
        const deleteBtns = document.querySelectorAll('.delete-btn');
        //Recorrer el arreglo de botones
        deleteBtns.forEach(function (btnDelete) {
            btnDelete.addEventListener('click', function (event) {
                const userId = this.dataset.userid;
                const row = this.closest('tr');
                axios.delete(`/api/usuarios/${userId}`)
                    .then((response) => {
                        console.log(response);
                        console.log(`User delete successfully !!`);
                        row.remove();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        });

        //Redireccionamiento para actualizar usuario
        const updateBtns = document.querySelectorAll('.edit-btn');
        updateBtns.forEach(function (btnUpdate) {
        btnUpdate.addEventListener('click', function (event) {
            const userId = this.dataset.userid;
            window.location.href=`/users/edit/${userId}`;



            
                axios.get(`/api/usuarios/${userId}`)

                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        });
    })
    .catch(function (error) {
        console.log(error);
    });
    */