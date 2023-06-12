"use strict"

const insertLabels = () => {
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
}

/**
 * Paso 1: Obtener los datos de los usuarios ✅
 * Paso 2: Crear una fila por cada usuario ✅
 * Paso 2.5: Crear los elementos de la fila con un metodo que devuelva la fila ✅
 * Paso 3: Agregar la fila a la tabla ✅
 * Paso 4: Agregar los labels a la fila ✅
 * Paso 5: Agregar funcionalidad a los botones ✅
 * Paso 5.1: Agregar funcionalidad al boton de editar ✅
 * Paso 5.2: Agregar funcionalidad al boton de eliminar ✅
 * Crear commit con los cambios ✅
 */

const newRow = (user) => {
  const row = document.createElement("tr");
  row.className = "table-row";

  const userName = document.createElement("td");
  userName.className = "table-label";
  // creo que no hacen falta los data-label
  userName.setAttribute("data-label", "Usuario");
  userName.innerHTML = user.nombre_usuario;

  const userEmail = document.createElement("td");
  userEmail.setAttribute("data-label", "Email");
  userEmail.innerHTML = user.correo;

  const userButtons = document.createElement("td");
  userButtons.className = "row-btns";

  const editButton = document.createElement("button");
  editButton.className = "button edit-btn";
  editButton.setAttribute("data-userid", user.id);
  editButton.innerHTML = "✏️";

  const deleteButton = document.createElement("button");
  deleteButton.className = "button delete-btn";
  deleteButton.setAttribute("data-userid", user.id);
  deleteButton.innerHTML = "🗑️";

  userButtons.appendChild(editButton);
  userButtons.appendChild(deleteButton);
  row.appendChild(userName);
  row.appendChild(userEmail);
  row.appendChild(userButtons);

  return row;
}

const deleteUserFunctionality = (userId) => {

  // validacion con swal 
  Swal.fire({
    title: '¿Estas seguro?',
    text: "El usuario sera eliminado permanentemente 😳",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`/api/usuarios/${userId}`)
        .then(() => {
          location.reload();
        })
        .catch(err => {
          // error en el servidor
          Swal.fire(
            'Error',
            'El usuario no pudo ser eliminado 😢',
            'error'
          );
        });
      Swal.fire(
        'Eliminado',
        'Usuario eliminado correctamente 👍',
        'success'
      );
    } else {
      Swal.fire(
        'Cancelado',
        'El usuario no fue eliminado 😉',
        'info'
      );
    }
  })
}

const handlingUsers = async () => {
  const response = await axios.get('/api/usuarios');
  return response.data;
}

handlingUsers().then(users => {
  const insertUsers = document.getElementById('insert-user');

  users.reverse().forEach(user => {
    insertUsers.appendChild(newRow(user));
  });
  insertLabels();

  const animacion = document.getElementById('loading');
  animacion.style.display = "none";

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-userid");
      deleteUserFunctionality(userId);
    });
  });

  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("data-userid");
      window.location.href = `/users/edit/${userId}`;
    });
  });
});


/**
 * voy a señalar lo que hace el codigo con una nota que comience con >==> para que sea mas facil de entender
 */

/*

>==> strList es una variable que almacena un string vacio, almacenara un formato en html que representara una fila de la tabla
var strList = '';

>==> peticion para traer a los usuarios
>==> todo se carga al callback, debo esperar a que la peticion termine para poder hacer algo con los datos
axios.get('/api/usuarios')
  .then(function (response) {

    >==> response.data es un arreglo de objetos, cada objeto representa un usuario
    var usuarios = response.data;

    >==> recorro el arreglo de usuarios, coloco los datos de los usuarios en el formato de fila html y lo concateno a strList
    >==> debo hacer una funcion que construya elemento por elemento dentro de la fila, es más limpio
    >==> me permitira manipular el orden en el que quiero mostrar los datos
    usuarios.forEach(function (user) {
      strList += `<tr>
                    <td data-label="Usuario">${user.nombre_usuario}</td>
                    <td data-label="Email">${user.correo}</td>
                    <td class="row-btns">
                      <button data-userid="${user.id}" class="button edit-btn">✏️</button>
                      <button data-userid="${user.id}" class="button delete-btn">🗑️</button>
                    </td>
                  </tr>`;
                
                  >==> el resultado de la concatenacion de strList es algo como esto
                  >==> debo usar metodos para crear los elementos y darles sus clases y atributos
                  <tr class="table-row">
                    <td class="table-label" data-label="Usuario">Prueba 1</td>
                    <td data-label="Email">correotext.text.text.text.text@correo.com</td>
                    <td class="row-btns">
                      <button data-userid="${user.id}" class="button edit-btn">✏️</button>
                      <button data-userid="${user.id}" class="button delete-btn">🗑️</button>
                    </td>
                  </tr>

    });

    >==> inserto el string en el id insert-user, el string contiene texto y no elementos html
    const insertUsers = document.getElementById('insert-user');
    insertUsers.innerHTML = strList;

    >==> cancelo la animacion de carga
    const animacion = document.getElementById('loading');
    animacion.style.display = "none";
    
    >==> recopilo los botones de borrar y editar en un arreglo
    >==> el for each se encuentra dentro del then de la peticion, debo esperar a que la peticion termine para poder recorrer los botones
    >==> el codigo sincrono y el call stack no me permitiran mapear los botones si no espero a que la peticion termine
    >==> mi mejor alternativa es crear una funcion y llamarla dentro del then
    const deleteBtns = document.querySelectorAll('.delete-btn');
    //Recorrer el arreglo de botones
    deleteBtns.forEach(function (btnDelete) {
      
      >==> a cada boton le agrego un evento click
      btnDelete.addEventListener('click', function (event) {

        >==> obtengo el id del usuario que quiero borrar
        const userId = this.dataset.userid;

        >==> ¿que hace el metodo closest?
        >==> el metodo closest busca el elemento mas cercano que coincida con el selector
        >==> en este caso el selector es tr, el elemento mas cercano que coincida con tr es la fila de la tabla
        const row = this.closest('tr');

        >==> peticion para borrar usuario
        >==> esto tambien puede ser enviado a su propio metodo
        axios.delete(`/api/usuarios/${userId}`)
          .then((response) => {
            console.log(response);
            console.log(`User delete successfully !!`);
            // INICIO ALERTA

            >==> confirmacion de borrado
            >==> funcion swal mal implementada
            (async () => {
              await Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado correctamente!',
                text: 'Gracias por probar la funcionalidad de borrar 🗑',
                timer: 6000,
              })
              >==> borro la fila de la tabla
              >==> ¿se borra de la vista?
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

    >==> recopilo los botones de editar en un arreglo
    const updateBtns = document.querySelectorAll('.edit-btn');
    updateBtns.forEach(function (btnUpdate) {

      >==> a cada boton le agrego un evento click
      >==> el click realiza una redireccion a la pagina de editar usuario
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