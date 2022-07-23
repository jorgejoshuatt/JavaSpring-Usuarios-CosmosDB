package com.proyecto.spring.model;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.azure.spring.data.cosmos.core.mapping.GeneratedValue;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;


@Getter
@Setter
@Container(containerName = "Usuario", ru="400")
public class Usuario {

    @Id
    @GeneratedValue
    private String id;
    //public @interface NonNull {}

    @PartitionKey
    private String nombre_usuario;

    private String correo;

    private String contrasenia;

    public Usuario(String nombre_usuario, String correo,String contrasenia){
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contrasenia = contrasenia;
    }
}