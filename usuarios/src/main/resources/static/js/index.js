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
    axios.post('/api/v1/usuarios',{
        "username": username.value,
        "email": email.value,
        "password": password.value
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