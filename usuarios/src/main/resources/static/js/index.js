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
            console.log(`User ${newUser.user} created successfully !!`)
            location.reload=true
        })
        .catch(function (error) {
            console.log(error);
        }).finally(function (){
            save.disabled=false;
    });
});
