package com.proyecto.spring.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.azure.spring.data.cosmos.repository.Query;
import com.proyecto.spring.model.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface UsuarioDBRepository extends CosmosRepository<Usuario, String> {
    // Query for all documents
    @Query(value = "SELECT * FROM u")
    List<Usuario> getAllUsuarios();

    @Query(value = "SELECT u.correo FROM Usuarios u")
    List<Usuario> getAllCorreos();
    //JPQL
    //Con @ se especifica el parametro
    //Query para buscar un correo
    @Query(value = "SELECT u.correo FROM Usuarios u WHERE u.correo=@correoform")
    List<Usuario> searchCorreo(String correoform);

    /*Se realiza solicitud(query) a CosmosDB con @Query y se proporciona la sentencia en formato
    JPQL con "value".*/
    @Query(value = "SELECT u.nombre_usuario FROM Usuarios u WHERE u.nombre_usuario=@nombre_usuarioform")
    /*Creamos una lista de objetos de tipo usuario, llamada searchNombreUsuario que guardara el
     *nombre* en la BD para posteriormente compararlo y regresarlo en formato json.*/
    List<Usuario> searchNombreUsuario(String nombre_usuarioform);


    //List<Usuario> findUsuarioByCorreoLike(@Param("correoform") String correoform);
}
