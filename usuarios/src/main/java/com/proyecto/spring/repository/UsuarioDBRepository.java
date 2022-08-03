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


    //List<Usuario> findUsuarioByCorreoLike(@Param("correoform") String correoform);
}
