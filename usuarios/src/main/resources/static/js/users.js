let data;

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

console.log(data)

const insertUsers = document.getElementById('insert-user');
let strList = '';

usersList.forEach(user => {
  strList += `<tr><td data-label="Usuario">${user.nombre_usuario}</td><td data-label="Email">${user.correo}</td><td data-label="#">  <button class="button">✏️</button>  <button class="button">🗑️</button></td></tr>`;
});

insertUsers.innerHTML = strList;