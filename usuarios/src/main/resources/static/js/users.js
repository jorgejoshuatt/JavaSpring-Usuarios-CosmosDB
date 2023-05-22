"use strict"

const tableRows = document.querySelectorAll(".table-row");
tableRows.forEach(row => {
  const userNameLabel = document.createElement("td");
  userNameLabel.className = "newLabelUser";
  userNameLabel.innerHTML = 'Usuario';
  const userEmailLabel = document.createElement("td");
  userEmailLabel.className = "newLabelEmail";
  userEmailLabel.innerHTML = "Email";
  row.prepend(userEmailLabel);
  row.prepend(userNameLabel);
});

/*
var strList = '';
axios.get('/api/usuarios')
  .then(function (response) {
    var usuarios = response.data;
    usuarios.forEach(function (user) {
      strList += `<tr>
                    <td data-label="Usuario">${user.nombre_usuario}</td>
                    <td data-label="Email">${user.correo}</td>
                    <td class="row-btns">
                      <button data-userid="${user.id}" class="button edit-btn">✏️</button>
                      <button data-userid="${user.id}" class="button delete-btn">🗑️</button>
                    </td>
                  </tr>`;
    });
    const insertUsers = document.getElementById('insert-user');
    insertUsers.innerHTML = strList;
    const animacion = document.getElementById('loading');
    animacion.style.display = "none";
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
            // INICIO ALERTA
            (async () => {
              await Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente!',
                text: 'Gracias por probar la funcionalidad de borrar 🗑',
                timer: 6000,
              })
              row.remove();
            })();
            // FINAL ALERTA
          })
          .catch((error) => {
            console.log(error);
            // INICIO ALERTA
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar usuario',
              text: 'Por favor compruebe su conexion a internet 🌐',
              timer: 6000,
            })
            // FINAL ALERTA
          });
      });
    });

    //Redireccionamiento para actualizar usuario
    const updateBtns = document.querySelectorAll('.edit-btn');
    updateBtns.forEach(function (btnUpdate) {
      btnUpdate.addEventListener('click', function (event) {
        const userId = this.dataset.userid;
        window.location.href = `/users/edit/${userId}`;
      });
    });
  })
  .catch(function (error) {
    console.log(error);
  });
  */