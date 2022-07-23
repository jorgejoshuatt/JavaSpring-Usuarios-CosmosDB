package com.proyecto.spring.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.azure.spring.data.cosmos.repository.Query;
import com.proyecto.spring.model.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import java.util.ArrayList;
import java.util.List;

@Repository
public interface UsuarioDBRepository extends CosmosRepository<Usuario, String> {
    // Query for all documents
    @Query(value = "SELECT * FROM u")
    List<Usuario> getAllUsuarios();

    //@Query(value = "SELECT correo FROM u where correo LIKE %:correoform%")
    //List<Usuario> searchCorreo(@Param("correoform") String correoform);
    //List<String> listaCorreo=new ArrayList<>();
}
