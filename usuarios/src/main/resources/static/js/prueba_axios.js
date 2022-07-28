let newUser = new Object();
let username = document.getElementById('nombre-usuario');
let email = document.getElementById('correo');
let password = document.getElementById('contrasenia');
let save = document.getElementById('save');

save.addEventListener('click', (e) => {
    e.preventDefault();
    newUser.user = username.value;
    newUser.email = email.value;
    newUser.password = password.value;
    axios.post('/api/v1/usuarios',{
        "nombre_usuario": username.value,
        "correo": email.value,
        "contrasenia": password.value
    })
        .then(function (response) {
            console.log(response);
            console.log(`User ${newUser.user} created successfully !!`)
        })
        .catch(function (error) {
            console.log(error);
        });
});

let agrario = document.getElementById('agrario');
agrario.addEventListener('click', (e) => {
    e.preventDefault();
    axios.get('/api/v1/usuarios')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
})